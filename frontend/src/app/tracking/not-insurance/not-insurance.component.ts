import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-not-insurance',
  templateUrl: './not-insurance.component.html',
  styleUrls: ['./not-insurance.component.css'],
})
export class NotInsuranceComponent implements OnInit {
  @Input('personalNotInsurances') personalNotInsurances: any = [];
  @Input('companiesNotInsurances') companiesNotInsurances: any = [];
  @Input('insuranceList') insuranceList: any = [];


  @Output("company") change = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.personalNotInsurances);
    console.log(this.companiesNotInsurances);
    console.log(this.insuranceList);
    
  }

  public EmitCompanyValue(code: string) {
    this.change.emit(code);
  }

}
