import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnLinePageRoutingModule } from './return-line-routing.module';

import { ReturnLinePage } from './return-line.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnLinePageRoutingModule
  ],
  declarations: [ReturnLinePage]
})
export class ReturnLinePageModule {}
