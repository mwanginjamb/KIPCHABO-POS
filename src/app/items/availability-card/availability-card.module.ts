import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailabilityCardPageRoutingModule } from './availability-card-routing.module';

import { AvailabilityCardPage } from './availability-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailabilityCardPageRoutingModule
  ],
  declarations: [AvailabilityCardPage]
})
export class AvailabilityCardPageModule {}
