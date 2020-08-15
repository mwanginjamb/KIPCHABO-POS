import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyreportPageRoutingModule } from './dailyreport-routing.module';

import { DailyreportPage } from './dailyreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyreportPageRoutingModule
  ],
  declarations: [DailyreportPage]
})
export class DailyreportPageModule {}
