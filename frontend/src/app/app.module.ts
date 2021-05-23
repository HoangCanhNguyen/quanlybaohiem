import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ReportComponent } from './report/report.component';
import { ManageComponent } from './manage/manage.component';
import { RegionComponent } from './tracking/region/region.component';
import { PersonalComponent } from './tracking/personal/personal.component';
import { NotInsuranceComponent } from './tracking/not-insurance/not-insurance.component';
import { WageComponent } from './manage/wage/wage.component';
import { InsuranceComponent } from './manage/insurance/insurance.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    TrackingComponent,
    ReportComponent,
    ManageComponent,
    RegionComponent,
    PersonalComponent,
    NotInsuranceComponent,
    WageComponent,
    InsuranceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
