import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WageService {

  constructor(private api: ApiService) { }

  public getWageRates() {
    return this.api.get("/wage")
  }

  public createWageRate(data: any) {
    return this.api.post("/wage", data);
  }

  public updateWageRate(data: any, id: string) {
    return this.api.put("/wage?id=" + id, data)
  }

  public deleteWageRate(id: string) {
    return this.api.delete("/wage?id=" + id)
  }
}
