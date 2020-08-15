import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsPage } from './payments.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPage
  },
  {
    path: 'payment-detail',
    loadChildren: () => import('./payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'new-payment',
    loadChildren: () => import('./new-payment/new-payment.module').then( m => m.NewPaymentPageModule)
  },
  {
    path: 'daily-report',
    loadChildren: () => import('./daily-report/daily-report.module').then( m => m.DailyReportPageModule)
  },
  {
    path: 'monthly-report',
    loadChildren: () => import('./monthly-report/monthly-report.module').then( m => m.MonthlyReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsPageRoutingModule {}
