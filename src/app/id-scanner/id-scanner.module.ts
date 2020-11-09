import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IdScannerPageRoutingModule } from "./id-scanner-routing.module";

import { IdScannerPage } from "./id-scanner.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IdScannerPageRoutingModule],
  declarations: [IdScannerPage],
})
export class IdScannerPageModule {}
