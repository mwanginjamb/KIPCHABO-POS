import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionDetailsPage } from './collection-details.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionDetailsPageRoutingModule {}
