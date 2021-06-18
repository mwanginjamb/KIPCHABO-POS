import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnListPageRoutingModule } from './return-list-routing.module';

import { ReturnListPage } from './return-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnListPageRoutingModule
  ],
  declarations: [ReturnListPage]
})
export class ReturnListPageModule {}
