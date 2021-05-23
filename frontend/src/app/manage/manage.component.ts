import { Component, OnInit } from '@angular/core';
import { RateService } from '../core/services/rate.service';
import { WageService } from '../core/services/wage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public wageList: any = [];
  public insurancesRate: any = [];

  constructor(private wageService: WageService, private rateService: RateService) { }

  ngOnInit(): void {
  }

  public getWageRates() {
    this.wageService.getWageRates().subscribe(res => {
      this.wageList = res;
      this.insurancesRate = [];
    })
  }

  public getInsuranceRate() {
    this.rateService.get().subscribe(res => {
      this.insurancesRate = res;
      this.wageList = [];
    })
  }

}
