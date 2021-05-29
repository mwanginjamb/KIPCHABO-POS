import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditDetailPage } from './credit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CreditDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditDetailPageRoutingModule {}
