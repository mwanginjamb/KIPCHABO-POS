import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinesPageRoutingModule } from './lines-routing.module';

import { LinesPage } from './lines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinesPageRoutingModule
  ],
  declarations: [LinesPage]
})
export class LinesPageModule {}
