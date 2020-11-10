import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Farmer } from "src/app/models/farmer.model";
import { FarmerService } from "../farmer.service";
import { DetailsPopoverComponent } from './details-popover/details-popover.component';

@Component({
  selector: "app-farmer-details",
  templateUrl: "./farmer-details.page.html",
  styleUrls: ["./farmer-details.page.scss"],
})
export class FarmerDetailsPage implements OnInit {
  card: Farmer;
  cardSub: Subscription;
  id: any;

  constructor(
    private farmerService: FarmerService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("No");

    this.cardSub = this.farmerService
      .farmerCard(this.id)
      .subscribe((cardInfo) => {
        this.card = cardInfo;
      });

    console.log(this.card);
  }

  async presentPopover(event) {
    const popover =  await this.popoverCtrl.create({
      component: DetailsPopoverComponent ,
      componentProps: { FarmerID: this.id },
      event
    });

    return await popover.present();

  }
}
