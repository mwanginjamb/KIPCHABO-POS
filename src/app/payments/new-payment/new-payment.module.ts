import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPaymentPageRoutingModule } from './new-payment-routing.module';

import { NewPaymentPage } from './new-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPaymentPageRoutingModule
  ],
  declarations: [NewPaymentPage]
})
export class NewPaymentPageModule {}
