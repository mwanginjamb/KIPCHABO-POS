import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisitionDetailsPageRoutingModule } from './requisition-details-routing.module';

import { RequisitionDetailsPage } from './requisition-details.page';
import { LinesComponent } from '../lines/lines.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequisitionDetailsPageRoutingModule,
  ],
  declarations: [RequisitionDetailsPage, LinesComponent],
  entryComponents: [ LinesComponent ],
})
export class RequisitionDetailsPageModule {}
