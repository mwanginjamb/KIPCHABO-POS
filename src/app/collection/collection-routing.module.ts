import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionPage } from './collection.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionPage
  },
  {
    path: 'lines',
    loadChildren: () => import('./lines/lines.module').then( m => m.LinesPageModule)
  },
  {
    path: 'new-collection',
    loadChildren: () => import('./new-collection/new-collection.module').then( m => m.NewCollectionPageModule)
  },
  {
    path: 'collection-details',
    loadChildren: () => import('./collection-details/collection-details.module').then( m => m.CollectionDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPageRoutingModule {}
