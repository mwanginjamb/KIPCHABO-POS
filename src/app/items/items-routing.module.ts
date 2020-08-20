import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsPage } from './items.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'availability',
    loadChildren: () => import('./availability-by-location/availability-by-location.module').then( m => m.AvailabilityByLocationPageModule)
  },
  {
    path: 'availability-card',
    loadChildren: () => import('./availability-card/availability-card.module').then( m => m.AvailabilityCardPageModule)
  },
  /*{
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsPageRoutingModule {}
