import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { StockDetailsPageModule } from "./stock-details/stock-details.module";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: "stockdetail",
    loadChildren: () => 
    import("./stock-details/stock-details.module").then((m) => m.StockDetailsPageModule),
  },
  {
    path: "orders",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./orders/orders.module").then((m) => m.OrdersPageModule),
      },
      {
        path: ":No",
        loadChildren: () =>
          import("./orders/order-detail/order-detail.module").then(
            (m) => m.OrderDetailPageModule
          ),
      },
      {
        path: "new-order",
        loadChildren: () =>
          import("./orders/new-order/new-order.module").then(
            (m) => m.NewOrderPageModule
          ),
      },
    ],
  },
  {
    path: "items",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./items/items.module").then((m) => m.ItemsPageModule),
      },
      {
        path: ":id",
        loadChildren: () =>
          import("./items/item-detail/item-detail.module").then(
            (m) => m.ItemDetailPageModule
          ),
      },
      {
        path: "availability",
        loadChildren: () =>
          import(
            "./items/availability-by-location/availability-by-location.module"
          ).then((m) => m.AvailabilityByLocationPageModule),
      },
      {
        path: "availability-card/:No",
        loadChildren: () =>
          import("./items/availability-card/availability-card.module").then(
            (m) => m.AvailabilityCardPageModule
          ),
      },
    ],
  },
  {
    path: "requisitions",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./requisitions/requisitions.module").then(
            (m) => m.RequisitionsPageModule
          ),
      },
      {
        path: ":id",
        loadChildren: () =>
          import(
            "./requisitions/requisition-details/requisition-details.module"
          ).then((m) => m.RequisitionDetailsPageModule),
      },
      {
        path: "new-requisition",
        loadChildren: () =>
          import("./requisitions/new-requisition/new-requisition.module").then(
            (m) => m.NewRequisitionPageModule
          ),
      },
      {
        path: "released-requisitions",
        loadChildren: () =>
          import(
            "./requisitions/released-requisitions/released-requisitions.module"
          ).then((m) => m.ReleasedRequisitionsPageModule),
      },
    ],
  },
  {
    path: "payments",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./payments/payments.module").then(
            (m) => m.PaymentsPageModule
          ),
      },
      {
        path: ":id",
        loadChildren: () =>
          import("./payments/payment-detail/payment-detail.module").then(
            (m) => m.PaymentDetailPageModule
          ),
      },
      {
        path: "new-payment",
        loadChildren: () =>
          import("./payments/new-payment/new-payment.module").then(
            (m) => m.NewPaymentPageModule
          ),
      },
      {
        path: "daily-report",
        loadChildren: () =>
          import("./payments/daily-report/daily-report.module").then(
            (m) => m.DailyReportPageModule
          ),
      },
      {
        path: "monthly-report",
        loadChildren: () =>
          import("./payments/monthly-report/monthly-report.module").then(
            (m) => m.MonthlyReportPageModule
          ),
      },
    ],
  },
  {
    path: "postedsales",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./postedsalesinvoices/postedsalesinvoices.module").then(
            (m) => m.PostedsalesinvoicesPageModule
          ),
      },
      {
        path: ":id",
        loadChildren: () =>
          import("./postedsalesinvoices/sale-detail/sale-detail.module").then(
            (m) => m.SaleDetailPageModule
          ),
      },
      {
        path: "dailyreport",
        loadChildren: () =>
          import("./postedsalesinvoices/dailyreport/dailyreport.module").then(
            (m) => m.DailyreportPageModule
          ),
      },
      {
        path: "monthlyreport",
        loadChildren: () =>
          import(
            "./postedsalesinvoices/monthlyreport/monthlyreport.module"
          ).then((m) => m.MonthlyreportPageModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'stock-details',
    loadChildren: () => import('./stock-details/stock-details.module').then( m => m.StockDetailsPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'return',
    loadChildren: () => import('./return/return.module').then( m => m.ReturnPageModule)
  },
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
