import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilityCardPage } from './availability-card.page';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilityCardPageRoutingModule {}
