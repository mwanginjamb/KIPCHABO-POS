import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostedsalesinvoicesPageRoutingModule } from './postedsalesinvoices-routing.module';

import { PostedsalesinvoicesPage } from './postedsalesinvoices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostedsalesinvoicesPageRoutingModule
  ],
  declarations: [PostedsalesinvoicesPage]
})
export class PostedsalesinvoicesPageModule {}
