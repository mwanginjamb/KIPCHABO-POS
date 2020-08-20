import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailPageRoutingModule } from './payment-detail-routing.module';

import { PaymentDetailPage } from './payment-detail.page';
import { ReceiptPopoverComponent } from '../receipt-popover/receipt-popover.component';
import { BluetoothComponent } from '../bluetooth/bluetooth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailPageRoutingModule
  ],
  entryComponents: [ReceiptPopoverComponent, BluetoothComponent],
  declarations: [PaymentDetailPage, ReceiptPopoverComponent, BluetoothComponent]
})
export class PaymentDetailPageModule {}
