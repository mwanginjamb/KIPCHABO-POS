import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashDepositDetailPageRoutingModule } from './cash-deposit-detail-routing.module';

import { CashDepositDetailPage } from './cash-deposit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashDepositDetailPageRoutingModule
  ],
  declarations: [CashDepositDetailPage]
})
export class CashDepositDetailPageModule {}
