import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockDetailsPage } from './stock-details.page';

const routes: Routes = [
  {
    path: ':id',
    component: StockDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockDetailsPageRoutingModule {}
