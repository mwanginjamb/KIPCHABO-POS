import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnCardPageRoutingModule } from './return-card-routing.module';

import { ReturnCardPage } from './return-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnCardPageRoutingModule
  ],
  declarations: [ReturnCardPage]
})
export class ReturnCardPageModule {}
