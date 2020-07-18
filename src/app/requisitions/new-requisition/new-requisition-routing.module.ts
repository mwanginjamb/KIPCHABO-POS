import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRequisitionPage } from './new-requisition.page';

const routes: Routes = [
  {
    path: '',
    component: NewRequisitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRequisitionPageRoutingModule {}
