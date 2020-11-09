import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerPageRoutingModule } from './farmer-routing.module';

import { FarmerPage } from './farmer.page';
import { FarmerPopoverComponent } from './farmer-popover/farmer-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerPageRoutingModule
  ],
  entryComponents: [ FarmerPopoverComponent ],
  declarations: [FarmerPage, FarmerPopoverComponent]
})
export class FarmerPageModule {}
