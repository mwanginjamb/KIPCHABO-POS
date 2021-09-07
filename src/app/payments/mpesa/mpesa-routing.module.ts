import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MpesaPage } from './mpesa.page';

const routes: Routes = [
  {
    path: '',
    component: MpesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MpesaPageRoutingModule {}
