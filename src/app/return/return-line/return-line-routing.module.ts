import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnLinePage } from './return-line.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnLinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnLinePageRoutingModule {}
