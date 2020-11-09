import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFarmerPageRoutingModule } from './new-farmer-routing.module';

import { NewFarmerPage } from './new-farmer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFarmerPageRoutingModule
  ],
  declarations: [NewFarmerPage]
})
export class NewFarmerPageModule {}
