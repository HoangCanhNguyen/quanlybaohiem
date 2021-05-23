import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  @Input("insurances") insurances: any = [];
  @Input("companies") companies: any= [];
  @Input("districtName") districtName: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.companies);
    
  }

}
