import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashDepositPageRoutingModule } from './cash-deposit-routing.module';

import { CashDepositPage } from './cash-deposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashDepositPageRoutingModule
  ],
  declarations: [CashDepositPage]
})
export class CashDepositPageModule {}
