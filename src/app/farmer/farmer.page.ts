import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  MenuController,
  PopoverController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { Farmer } from "../models/farmer.model";
import { FarmerPopoverComponent } from './farmer-popover/farmer-popover.component';
import { FarmerService } from "./farmer.service";

@Component({
  selector: "app-farmer",
  templateUrl: "./farmer.page.html",
  styleUrls: ["./farmer.page.scss"],
})
export class FarmerPage implements OnInit {
  isLoading = true;
  farmersSub: Subscription;
  farmers: Array<Farmer>;
  searchTerm: string = null;

  constructor(
    private farmerService: FarmerService,
    private menuCtrl: MenuController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.farmersSub = this.farmerService.Farmers.subscribe(
      (result) => {
        this.farmers = [...result];
        this.isLoading = false;
        console.log(this.farmers);
      },
      (error) => {
        this.isLoading = false;
        console.log(error.error);
        this.alertCtrl
          .create({
            header: "Service Error!",
            message: "Connection problem: " + error.error.message,
            buttons: [{ text: "Okay" }],
          })
          .then((alertEl) => {
            alertEl.present();
          });
      }
    );
  }

  async presentPopover(event) {
    const popover =  await this.popoverCtrl.create({
      component: FarmerPopoverComponent,
      event
    });

    return await popover.present();

  }
}
