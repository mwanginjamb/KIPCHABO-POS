import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleasedRequisitionsPageRoutingModule } from './released-requisitions-routing.module';

import { ReleasedRequisitionsPage } from './released-requisitions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleasedRequisitionsPageRoutingModule
  ],
  declarations: [ReleasedRequisitionsPage]
})
export class ReleasedRequisitionsPageModule {}
