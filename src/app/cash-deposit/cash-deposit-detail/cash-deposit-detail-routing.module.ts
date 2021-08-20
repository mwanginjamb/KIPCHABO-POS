import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashDepositDetailPage } from './cash-deposit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CashDepositDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashDepositDetailPageRoutingModule {}
