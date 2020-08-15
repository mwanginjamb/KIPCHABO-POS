import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyReportPage } from './monthly-report.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyReportPageRoutingModule {}
