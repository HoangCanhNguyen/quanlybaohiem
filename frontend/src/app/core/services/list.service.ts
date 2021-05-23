import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private api: ApiService) {}

  public getInsurancesByRegion(type: string, data: any) {
    return this.api.post('/insurance?type=' + type, data);
  }

  public getInsurancesByDateRange(type: string, data: any) {
    return this.api.post('/insurance/personal?type=' + type, data);
  }

  public getNotInsurancesByDateRange(type: string, data: any) {
    return this.api.post('/insurance/not-insurance?type=' + type, data);
  }

  public getCompanyInsurances(data: any) {
    return this.api.post("/insurance/company", data)
  }
}
