import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MpesaPageRoutingModule } from './mpesa-routing.module';

import { MpesaPage } from './mpesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MpesaPageRoutingModule
  ],
  declarations: [MpesaPage]
})
export class MpesaPageModule {}
