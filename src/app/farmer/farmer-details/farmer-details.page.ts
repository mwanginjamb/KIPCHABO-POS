import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Farmer } from "src/app/models/farmer.model";
import { FarmerService } from "../farmer.service";

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
    private modalCtrl: ModalController
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
}
