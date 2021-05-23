import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Districts } from '../core/data/district.data';
import { ListService } from '../core/services/list.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  public readonly insuranceTypes: string[] = [
    'BHXH bắt buộc',
    'BHXH tự nguyện',
  ];

  public readonly districts: string[] = Districts;

  public districtForm: FormGroup;
  public personalForm: FormGroup;
  public viewMode: string;

  // Data get by region
  public insurances: any = [];
  public companies: any = [];

  // Data get by date range
  public personalInsurances: any = [];
  public companyInsurances: any = [];

  public individualInsurances: any = [];

  // Do not take insurances
  public personalNotInsurances: any = [];
  public companiesNotInsurances: any = [];
  public insuranceList: any = [];


  @ViewChild('closeRegionModal') closeRegionModal: ElementRef;
  @ViewChild('closePersonalModal') closePersonalModal: ElementRef;
  @ViewChild('closeNotInsuranceModal') closeNotInsuranceModal: ElementRef;

  constructor(private listService: ListService, public location: Location) {
    this.districtForm = new FormGroup({
      district: new FormControl('Ba Đình', [Validators.required]),
      type: new FormControl('BHXH bắt buộc', [Validators.required]),
    });
    this.personalForm = new FormGroup({
      code: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      start_at: new FormControl(null, [Validators.required]),
      end_at: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  showInsuranceByRegion() {
    this.companies = [];
    this.insurances = [];
    var type: string;
    if (this.districtForm.value.type === 'BHXH tự nguyện') {
      type = 'willingly';
    } else {
      type = 'compulsory';
    }
    this.listService
      .getInsurancesByRegion(type, this.districtForm.value)
      .pipe(
        map((res) => {
          if (type === 'willingly') {
            this.insurances = res;
          } else {
            this.companies = res;
            this.companies.forEach((company) => {
              company.users = company.users.length;
            });
          }
        })
      )
      .subscribe((res) => {
        this.viewMode = 'region';
        this.closeRegionModal.nativeElement.click();
      });
  }

  showInsuranceByPersonal() {
    var type;
    if (this.personalForm.value.type === 'BHXH tự nguyện') {
      type = 'willingly';
    } else {
      type = 'compulsory';
    }
    const start_at = new Date(this.personalForm.value.start_at);
    const end_at = new Date(this.personalForm.value.end_at);

    const personalData = {
      code: this.personalForm.value.code,
      type: this.personalForm.value.type,
      start_at: start_at.getTime(),
      end_at: end_at.getTime(),
      status: 'Đã đóng',
    };
    this.listService
      .getInsurancesByDateRange(type, personalData)
      .subscribe((res) => {
        this.individualInsurances = [];
        if (type === 'compulsory') {
          this.companyInsurances = res;
          this.personalInsurances = [];
        } else {
          this.personalInsurances = res;
          this.companyInsurances = [];
        }
        this.closePersonalModal.nativeElement.click();
        this.viewMode = 'dateRange';
        this.personalForm.reset();
      });
  }

  showNotInsurances() {
    var type;
    this.insuranceList = []
    if (this.personalForm.value.type === 'BHXH tự nguyện') {
      type = 'willingly';
    } else {
      type = 'compulsory';
    }
    const start_at = new Date(this.personalForm.value.start_at);
    const end_at = new Date(this.personalForm.value.end_at);
    const personalData = {
      start_at: start_at.getTime(),
      end_at: end_at.getTime(),
      status: 'Chưa đóng',
      type: this.personalForm.value.type,
    };
    this.listService
      .getNotInsurancesByDateRange(type, personalData)
      .subscribe((res) => {
        if (type === 'compulsory') {
          this.companiesNotInsurances = res;
          this.personalNotInsurances = [];
        } else {
          this.personalNotInsurances = res;
          this.companiesNotInsurances = [];
        }
        this.viewMode = 'not-insurance';
        this.closeNotInsuranceModal.nativeElement.click();
      });
  }

  getUserInsurances(insurance_code: string) {
    const start_at = new Date(this.personalForm.value.start_at);
    const end_at = new Date(this.personalForm.value.end_at);

    const personalData = {
      code: insurance_code,
      type: this.personalForm.value.type,
      start_at: start_at.getTime(),
      end_at: end_at.getTime(),
    };
    this.listService
      .getInsurancesByDateRange('willingly', personalData)
      .subscribe((res) => {
        this.individualInsurances = res;
      });
  }

  getCompanyInsurances(insurance_code: string) {
    const start_at = new Date(this.personalForm.value.start_at);
    const end_at = new Date(this.personalForm.value.end_at);

    const data = {
      code: insurance_code,
      start_at: start_at.getTime(),
      end_at: end_at.getTime(),
    };
    this.listService.getCompanyInsurances(data).subscribe((res) => {
      this.insuranceList = res;
    });
  }

  ngOnDestroy(): void {
    this.closeRegionModal.nativeElement.click();
    this.closePersonalModal.nativeElement.click();
    this.closeNotInsuranceModal.nativeElement.click();
  }
}
