import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPaymentPage } from './new-payment.page';

const routes: Routes = [
  {
    path: '',
    component: NewPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPaymentPageRoutingModule {}
