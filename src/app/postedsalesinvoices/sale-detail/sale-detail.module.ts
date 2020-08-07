import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleDetailPageRoutingModule } from './sale-detail-routing.module';

import { SaleDetailPage } from './sale-detail.page';
import { SalesPopoverComponent } from '../sales-popover/sales-popover.component';
import { BluetoothComponent } from 'src/app/payments/bluetooth/bluetooth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleDetailPageRoutingModule
  ],
  entryComponents: [ SalesPopoverComponent, BluetoothComponent ],
  declarations: [SaleDetailPage, SalesPopoverComponent, BluetoothComponent]
})
export class SaleDetailPageModule {}
