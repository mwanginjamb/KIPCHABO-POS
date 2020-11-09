import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerDetailsPageRoutingModule } from './farmer-details-routing.module';

import { FarmerDetailsPage } from './farmer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerDetailsPageRoutingModule
  ],
  declarations: [FarmerDetailsPage]
})
export class FarmerDetailsPageModule {}
