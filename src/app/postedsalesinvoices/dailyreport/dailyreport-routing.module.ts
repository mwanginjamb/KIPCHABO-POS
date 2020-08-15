import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyreportPage } from './dailyreport.page';

const routes: Routes = [
  {
    path: '',
    component: DailyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyreportPageRoutingModule {}
