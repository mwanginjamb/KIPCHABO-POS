import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Collection } from "src/app/models/collection.model";
import { Collectionline } from "src/app/models/collectionline.model";
import { CollectionService } from "../collection.service";

@Component({
  selector: "app-collection-details",
  templateUrl: "./collection-details.page.html",
  styleUrls: ["./collection-details.page.scss"],
})
export class CollectionDetailsPage implements OnInit {
  No = null;
  cardSub: Subscription;
  card: Collection = new Collection();
  line: Collectionline;

  constructor(
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.No = this.activatedRoute.snapshot.paramMap.get("No");

    this.cardSub = this.collectionService
      .collectionCard(this.No)
      .subscribe((result) => {
        this.card = result;
        console.log(result);
      });
  }

  onAddLine() {}

  onUpdateLine(LineNo: string) {}
}
