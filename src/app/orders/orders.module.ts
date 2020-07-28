import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { PopoverComponent } from './popover/popover.component';
import { LinesComponent } from './lines/lines.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  entryComponents: [ PopoverComponent, LinesComponent ],
  declarations: [OrdersPage, PopoverComponent, LinesComponent]
})
export class OrdersPageModule {}
