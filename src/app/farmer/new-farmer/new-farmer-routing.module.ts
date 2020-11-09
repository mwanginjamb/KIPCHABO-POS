import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFarmerPage } from './new-farmer.page';

const routes: Routes = [
  {
    path: '',
    component: NewFarmerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFarmerPageRoutingModule {}
