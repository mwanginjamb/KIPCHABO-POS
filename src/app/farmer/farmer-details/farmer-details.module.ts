import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerDetailsPageRoutingModule } from './farmer-details-routing.module';

import { FarmerDetailsPage } from './farmer-details.page';
import { DetailsPopoverComponent } from './details-popover/details-popover.component';
import { TakeIdbackComponent } from './take-idback/take-idback.component';
import { TakeIdfrontComponent } from './take-idfront/take-idfront.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { TakeSignatureComponent } from './take-signature/take-signature.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerDetailsPageRoutingModule
  ],
  entryComponents: [ DetailsPopoverComponent, TakeIdbackComponent, TakeIdfrontComponent, TakePhotoComponent, TakeSignatureComponent ],
  declarations: [FarmerDetailsPage, DetailsPopoverComponent, TakeIdbackComponent, TakeIdfrontComponent, TakePhotoComponent,
     TakeSignatureComponent]
})
export class FarmerDetailsPageModule {}
