import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { ReportComponent } from './report/report.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes = [
  { path: 'trang-chu', component: AuthComponent },
  {
    path: 'quan-ly',
    component: HomeComponent,
    children: [
      { path: 'danh-sach', component: TrackingComponent },
      { path: 'bao-cao', component: ReportComponent },
      { path: 'cau-hinh', component: ManageComponent },
    ],
  },
  { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
