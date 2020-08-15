import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyReportPage } from './daily-report.page';

const routes: Routes = [
  {
    path: '',
    component: DailyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyReportPageRoutingModule {}
