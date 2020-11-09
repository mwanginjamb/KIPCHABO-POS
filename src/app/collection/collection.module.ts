import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionPageRoutingModule } from './collection-routing.module';

import { CollectionPage } from './collection.page';
import { CollectionPopoverComponent } from './collection-popover/collection-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPageRoutingModule
  ],
  entryComponents: [ CollectionPopoverComponent ],
  declarations: [CollectionPage, CollectionPopoverComponent]
})
export class CollectionPageModule {}
