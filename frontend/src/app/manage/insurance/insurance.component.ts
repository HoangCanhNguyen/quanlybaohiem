import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RateService } from 'src/app/core/services/rate.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
})
export class InsuranceComponent implements OnInit {
  @Input('insurancesRate') insurancesRate: any = [];

  public rateForm: FormGroup;
  public type: string;
  public message: string;

  constructor(private rateService: RateService) {
    this.rateForm = new FormGroup({
      _id: new FormControl(null),
      personal_rate: new FormControl(null, [Validators.required]),
      organization_rate: new FormControl(null, [Validators.required]),
      summary: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  choose(rate: any): void {
    this.rateForm.patchValue({
      _id: rate._id,
      personal_rate: +rate.personal_rate.$numberDecimal,
      organization_rate: +rate.organization_rate.$numberDecimal,
    });
    this.type = rate.type;
  }

  update() {
    const total =
      this.rateForm.value.personal_rate + this.rateForm.value.organization_rate;
    this.rateForm.patchValue({
      summary: total,
    });
    this.rateService
      .update(this.rateForm.value._id, this.rateForm.value)
      .subscribe((res) => {
        this.insurancesRate.forEach((rate) => {
          if (rate._id === this.rateForm.value._id) {
            rate.personal_rate = res.personal_rate;
            rate.organization_rate = res.organization_rate;
            rate.summary = res.summary;
          }
          return rate;
        });
        this.rateForm.reset();
        this.message = "Cập nhật thành công"
        this.type = null
      });
  }

  cancel() {
    this.rateForm.reset();
    this.type = null;
    this.message = null
  }
}
