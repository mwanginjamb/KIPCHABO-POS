import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule ),
      },
      {
        path: ':No',
        loadChildren: () => import('./orders/order-detail/order-detail.module').then( m => m.OrderDetailPageModule ),
      },
      {
        path: 'new-order',
        loadChildren: () => import('./orders/new-order/new-order.module').then( m => m.NewOrderPageModule)
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
  {
    path: 'payments',
    children: [
      {
        path: '',
        loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./payments/payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule )
      },
      {
        path: 'new-payment',
        loadChildren: () => import('./payments/new-payment/new-payment.module').then( m => m.NewPaymentPageModule)
      }
    ]

  },
  {
    path: 'postedsales',
    children: [
      {
        path: '',
        loadChildren: () => import('./postedsalesinvoices/postedsalesinvoices.module').then( m => m.PostedsalesinvoicesPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./postedsalesinvoices/sale-detail/sale-detail.module').then( m => m.SaleDetailPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
