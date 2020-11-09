import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerDetailsPage } from './farmer-details.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerDetailsPageRoutingModule {}
