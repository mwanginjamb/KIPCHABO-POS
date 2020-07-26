import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailPageRoutingModule } from './order-detail-routing.module';

import { OrderDetailPage } from './order-detail.page';
import { LinesComponent } from 'src/app/requisitions/lines/lines.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule
  ],
  entryComponents: [ LinesComponent ],
  declarations: [OrderDetailPage, LinesComponent]
})
export class OrderDetailPageModule {}
