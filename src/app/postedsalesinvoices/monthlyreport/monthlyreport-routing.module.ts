import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyreportPage } from './monthlyreport.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyreportPageRoutingModule {}
