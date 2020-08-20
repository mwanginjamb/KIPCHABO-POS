import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailabilityByLocationPageRoutingModule } from './availability-by-location-routing.module';

import { AvailabilityByLocationPage } from './availability-by-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailabilityByLocationPageRoutingModule
  ],
  declarations: [AvailabilityByLocationPage]
})
export class AvailabilityByLocationPageModule {}
