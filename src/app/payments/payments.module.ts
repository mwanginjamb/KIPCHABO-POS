import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';
import { PaymentPopoverComponent } from './payment-popover/payment-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule
  ],
  entryComponents: [ PaymentPopoverComponent ],
  declarations: [PaymentsPage, PaymentPopoverComponent]
})
export class PaymentsPageModule {}
