import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisitionsPageRoutingModule } from './requisitions-routing.module';

import { RequisitionsPage } from './requisitions.page';
import { ReqPopoverComponent } from './req-popover/req-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequisitionsPageRoutingModule
  ],
  entryComponents: [ ReqPopoverComponent ],
  declarations: [RequisitionsPage, ReqPopoverComponent]
})
export class RequisitionsPageModule {}
