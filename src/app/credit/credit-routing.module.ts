import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditPage } from './credit.page';

const routes: Routes = [
  {
    path: '',
    component: CreditPage
  },
  {
    path: 'credit-detail',
    loadChildren: () => import('./credit-detail/credit-detail.module').then( m => m.CreditDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditPageRoutingModule {}
