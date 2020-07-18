import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRequisitionPageRoutingModule } from './new-requisition-routing.module';

import { NewRequisitionPage } from './new-requisition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRequisitionPageRoutingModule
  ],
  declarations: [NewRequisitionPage]
})
export class NewRequisitionPageModule {}
