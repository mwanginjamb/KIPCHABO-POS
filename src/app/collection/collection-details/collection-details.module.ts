import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionDetailsPageRoutingModule } from './collection-details-routing.module';

import { CollectionDetailsPage } from './collection-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionDetailsPageRoutingModule
  ],
  declarations: [CollectionDetailsPage]
})
export class CollectionDetailsPageModule {}
