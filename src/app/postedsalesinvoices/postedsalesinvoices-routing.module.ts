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
  },
  {
    path: 'dailyreport',
    loadChildren: () => import('./dailyreport/dailyreport.module').then( m => m.DailyreportPageModule)
  },
  {
    path: 'monthlyreport',
    loadChildren: () => import('./monthlyreport/monthlyreport.module').then( m => m.MonthlyreportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostedsalesinvoicesPageRoutingModule {}
