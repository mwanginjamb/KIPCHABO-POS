import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditDetailPageRoutingModule } from './credit-detail-routing.module';

import { CreditDetailPage } from './credit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditDetailPageRoutingModule
  ],
  declarations: [CreditDetailPage]
})
export class CreditDetailPageModule {}
