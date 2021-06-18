import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnPageRoutingModule } from './return-routing.module';

import { ReturnPage } from './return.page';
import { ReturnLineComponent } from './return-line/return-line.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnPageRoutingModule
  ],
  entryComponents:[ ReturnLineComponent ],
  declarations: [ReturnPage, ReturnLineComponent]
})
export class ReturnPageModule {}
