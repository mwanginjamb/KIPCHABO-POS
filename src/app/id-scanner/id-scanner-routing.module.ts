import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdScannerPage } from './id-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: IdScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdScannerPageRoutingModule {}
