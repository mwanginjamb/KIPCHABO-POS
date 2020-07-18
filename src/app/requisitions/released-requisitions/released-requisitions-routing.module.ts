import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleasedRequisitionsPage } from './released-requisitions.page';

const routes: Routes = [
  {
    path: '',
    component: ReleasedRequisitionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasedRequisitionsPageRoutingModule {}
