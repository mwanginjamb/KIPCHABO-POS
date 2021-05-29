import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPaymentPageRoutingModule } from './new-payment-routing.module';

import { NewPaymentPage } from './new-payment.page';
import { NewCashLineComponent } from '../new-cash-line/new-cash-line.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPaymentPageRoutingModule
  ],
  entryComponents:[ NewCashLineComponent ],
  declarations: [NewPaymentPage, NewCashLineComponent]
})
export class NewPaymentPageModule {}
