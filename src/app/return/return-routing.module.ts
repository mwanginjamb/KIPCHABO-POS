import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnPage } from './return.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnPage
  },
  {
    path: 'return-line',
    loadChildren: () => import('./return-line/return-line.module').then( m => m.ReturnLinePageModule)
  },
  {
    path: 'return-list',
    loadChildren: () => import('./return-list/return-list.module').then( m => m.ReturnListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnPageRoutingModule {}
