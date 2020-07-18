import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule ),
      },
      {
        path: ':orderNo',
        loadChildren: () => import('./orders/order-detail/order-detail.module').then( m => m.OrderDetailPageModule ),
      }
    ]
  },
  {
    path: 'items',
    children: [
     {
       path: '',
       loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
     },
     {
       path: ':id',
       loadChildren: () => import('./items/item-detail/item-detail.module').then( m => m.ItemDetailPageModule )
     }
    ],
  },
  {
    path: 'requisitions',
    children: [
      {
        path: '',
        loadChildren: () => import('./requisitions/requisitions.module').then( m => m.RequisitionsPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./requisitions/requisition-details/requisition-details.module')
        .then( m => m.RequisitionDetailsPageModule )
      },
      {
        path: 'new-requisition',
        loadChildren: () => import('./requisitions/new-requisition/new-requisition.module').then( m => m.NewRequisitionPageModule)
      },
      {
        path: 'released-requisitions',
        loadChildren: () => import('./requisitions/released-requisitions/released-requisitions.module')
        .then( m => m.ReleasedRequisitionsPageModule)
      }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
