import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnCardPage } from './return-card.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnCardPageRoutingModule {}
