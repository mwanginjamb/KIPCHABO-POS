import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashDepositPage } from './cash-deposit.page';

const routes: Routes = [
  {
    path: '',
    component: CashDepositPage
  },
  {
    path: 'cash-deposit-detail',
    loadChildren: () => import('./cash-deposit-detail/cash-deposit-detail.module').then( m => m.CashDepositDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashDepositPageRoutingModule {}
