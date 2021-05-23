import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private api: ApiService) { }

  public get() {
    return this.api.get("/insurance/rate");
  }

  public update(id: string, data: any) {
    return this.api.put("/insurance/rate?id=" + id, data);
  }
}
