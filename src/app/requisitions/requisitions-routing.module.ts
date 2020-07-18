import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisitionsPage } from './requisitions.page';

const routes: Routes = [
  {
    path: '',
    component: RequisitionsPage
  },
  {
    path: 'requisition-details',
    loadChildren: () => import('./requisition-details/requisition-details.module').then( m => m.RequisitionDetailsPageModule)
  },
  {
    path: 'new-requisition',
    loadChildren: () => import('./new-requisition/new-requisition.module').then( m => m.NewRequisitionPageModule)
  },
  {
    path: 'released-requisitions',
    loadChildren: () => import('./released-requisitions/released-requisitions.module').then( m => m.ReleasedRequisitionsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitionsPageRoutingModule {}
