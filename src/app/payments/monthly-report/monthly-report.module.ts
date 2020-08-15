import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyReportPageRoutingModule } from './monthly-report-routing.module';

import { MonthlyReportPage } from './monthly-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyReportPageRoutingModule
  ],
  declarations: [MonthlyReportPage]
})
export class MonthlyReportPageModule {}
