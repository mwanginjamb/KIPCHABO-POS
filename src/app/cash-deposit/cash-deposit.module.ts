import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashDepositPageRoutingModule } from './cash-deposit-routing.module';

import { CashDepositPage } from './cash-deposit.page';
import { NewDepositComponent } from './new-deposit/new-deposit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashDepositPageRoutingModule
  ],
  entryComponents: [ NewDepositComponent ],
  declarations: [CashDepositPage, NewDepositComponent]
})
export class CashDepositPageModule {}
