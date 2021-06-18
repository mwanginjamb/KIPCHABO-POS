import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnListPage } from './return-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnListPageRoutingModule {}
