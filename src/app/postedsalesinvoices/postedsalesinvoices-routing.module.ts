import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostedsalesinvoicesPage } from './postedsalesinvoices.page';

const routes: Routes = [
  {
    path: '',
    component: PostedsalesinvoicesPage
  },
  {
    path: 'sale-detail',
    loadChildren: () => import('./sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostedsalesinvoicesPageRoutingModule {}
