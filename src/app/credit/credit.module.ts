import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditPageRoutingModule } from './credit-routing.module';

import { CreditPage } from './credit.page';
import { CreditPopoverComponent } from './credit-popover/credit-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditPageRoutingModule
  ],
  entryComponents: [ CreditPopoverComponent],
  declarations: [CreditPage]
})
export class CreditPageModule {}
