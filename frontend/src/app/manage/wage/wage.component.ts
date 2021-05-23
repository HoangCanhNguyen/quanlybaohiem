import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WageService } from 'src/app/core/services/wage.service';

@Component({
  selector: 'app-wage',
  templateUrl: './wage.component.html',
  styleUrls: ['./wage.component.css'],
})
export class WageComponent implements OnInit {
  @Input('wageList') wageList: any = [];
  public isDisableAddBtn = false;
  public wageId: string;

  public wageForm: FormGroup;
  public message: string;

  constructor(private wageService: WageService) {
    this.wageForm = new FormGroup({
      area: new FormControl(null, [Validators.required]),
      minimum_wage: new FormControl(null, [Validators.required]),
      maximum_wage: new FormControl(null, [Validators.required]),
      trained_employees_rate: new FormControl(null, [Validators.required]),
      trained_employees_wage: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  add() {
    const value = this.wageForm.value;
    const finalWage =
      value.minimum_wage +
      (value.minimum_wage * value.trained_employees_rate) / 100;
    this.wageForm.patchValue({
      trained_employees_wage: finalWage,
    });

    this.wageService.createWageRate(this.wageForm.value).subscribe((res) => {
      this.message = 'Thêm thành công';
      this.wageForm.reset();
      this.wageList.push({
        _id: res._id,
        area: value.area,
        wage: value.wage,
        minimum_wage: value.minimum_wage,
        maximum_wage: value.maximum_wage,
        trained_employees_rate: res.trained_employees_rate,
        trained_employees_wage: finalWage,
      });
    });
  }

  delete() {
    this.wageService.deleteWageRate(this.wageId).subscribe((res) => {
      this.wageList = this.wageList.filter((wage) => wage._id != this.wageId);
      this.wageForm.reset();
      this.message = 'xoá thành công';
      this.isDisableAddBtn = false;
    });
  }

  choose(wage: any) {
    this.isDisableAddBtn = true;
    this.wageId = wage._id;
    this.wageForm.patchValue({
      area: wage.area,
      minimum_wage: wage.minimum_wage,
      maximum_wage: wage.maximum_wage,
      trained_employees_rate: +wage.trained_employees_rate.$numberDecimal,
    });
  }

  update() {
    const value = this.wageForm.value;
    const finalWage =
      value.minimum_wage +
      (value.minimum_wage * value.trained_employees_rate) / 100;
    this.wageForm.patchValue({
      trained_employees_wage: finalWage,
    });

    this.wageService
      .updateWageRate(this.wageForm.value, this.wageId)
      .subscribe((res) => {
        this.message = 'Cập nhật thành công';
        this.wageForm.reset();
        this.isDisableAddBtn = false;

        this.wageList = this.wageList.map((wage) => {
          if (wage._id === this.wageId) {
            wage = {
              _id: res._id,
              area: value.area,
              wage: value.wage,
              minimum_wage: value.minimum_wage,
              maximum_wage: value.maximum_wage,
              trained_employees_rate: res.trained_employees_rate,
              trained_employees_wage: finalWage,
            };
          }
          return wage;
        });
      });
  }

  cancel() {
    this.wageForm.reset();
    this.isDisableAddBtn = false;
    this.message = null;
  }
}
