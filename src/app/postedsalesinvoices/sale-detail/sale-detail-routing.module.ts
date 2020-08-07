import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleDetailPage } from './sale-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SaleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleDetailPageRoutingModule {}
