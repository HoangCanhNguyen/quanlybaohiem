import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Districts } from '../core/data/district.data';
import { ListService } from '../core/services/list.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  public readonly insuranceTypes: string[] = [
    'BHXH bắt buộc',
    'BHXH tự nguyện',
  ];

  public districtForm: FormGroup;
  public dateRangeForm: FormGroup;

  public willinglyInsurances: any = [];
  public compulsoryInsurances: any = [];
  public users: any = [];

  public readonly districts: string[] = Districts;

  public insurances: any = [];
  public companies: any = [];

  @ViewChild('closedateRangeModal') closedateRangeModal: ElementRef;
  @ViewChild('closeRegionModal') closeRegionModal: ElementRef;

  constructor(private listService: ListService) {
    this.dateRangeForm = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      start_at: new FormControl(null, [Validators.required]),
      end_at: new FormControl(null, [Validators.required]),
    });
    this.districtForm = new FormGroup({
      district: new FormControl('Ba Đình', [Validators.required]),
      type: new FormControl('BHXH bắt buộc', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  showReportByDateRange() {
    var type: string;
    if (this.dateRangeForm.value.type === 'BHXH tự nguyện') {
      type = 'willingly';
    } else {
      type = 'compulsory';
    }
    const start_at = new Date(this.dateRangeForm.value.start_at);
    const end_at = new Date(this.dateRangeForm.value.end_at);
    this.resetArray();
    const data = {
      start_at: start_at.getTime(),
      end_at: end_at.getTime(),
      status: 'Đã đóng',
    };

    this.listService
      .getNotInsurancesByDateRange(type, data)
      .pipe(
        map((insurances) => {
          var seen = new Set();
          if (type === 'willingly') {
            insurances = insurances.filter((insu) => !insu.isCompanyInsurance);
            const filted = insurances.filter((el) => {
              const duplicate = seen.has(el.code);
              seen.add(el.code);
              return !duplicate;
            });
            return filted;
          } else return insurances;
        })
      )
      .subscribe((res) => {
        if (type === 'willingly') {
          this.willinglyInsurances = res;
          this.compulsoryInsurances = [];
        } else {
          this.compulsoryInsurances = res;
          this.willinglyInsurances = [];
        }
        this.closedateRangeModal.nativeElement.click();
      });
  }

  getUsersByCompany(company_id: string) {
    this.compulsoryInsurances.map((comp) => {
      if (comp.company_id === company_id) this.users = comp.users;
    });
  }

  showInsuranceByRegion() {
    this.resetArray();
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
            var seen = new Set();
            this.insurances = res;
            this.insurances = this.insurances.filter((el) => {
              const duplicate = seen.has(el.code);
              seen.add(el.code);
              return !duplicate;
            });
          } else {
            this.companies = res;
            console.log(this.companies);
          }
        })
      )
      .subscribe((res) => {
        this.closeRegionModal.nativeElement.click();
      });
  }

  getUsersByCompanyAndRegion(company_id: string) {
    const company = this.companies.find(
      (comp) => comp.company_id === company_id
    );
    this.users = company.users.filter(
      (user) => user.address == this.districtForm.value.district
    );
  }

  private resetArray() {
    this.willinglyInsurances = [];
    this.compulsoryInsurances = [];
    this.users = [];
    this.companies = [];
    this.insurances = [];
  }
}
