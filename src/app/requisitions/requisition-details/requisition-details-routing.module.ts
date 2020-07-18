import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisitionDetailsPage } from './requisition-details.page';

const routes: Routes = [
  {
    path: '',
    component: RequisitionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitionDetailsPageRoutingModule {}
