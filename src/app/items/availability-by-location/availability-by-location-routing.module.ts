import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilityByLocationPage } from './availability-by-location.page';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityByLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilityByLocationPageRoutingModule {}
