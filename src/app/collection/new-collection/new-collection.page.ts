import { Component, OnInit } from "@angular/core";
import { PopoverController } from '@ionic/angular';
import { Collection } from "src/app/models/collection.model";
import { Farmer } from 'src/app/models/farmer.model';

@Component({
  selector: "app-new-collection",
  templateUrl: "./new-collection.page.html",
  styleUrls: ["./new-collection.page.scss"],
})


export class NewCollectionPage implements OnInit {
  collection: Collection = new Collection();
  farmers: Array<Farmer>;
  shades: any;
  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.popoverCtrl.dismiss();
  }

  onCollectionUpdate() {}
}
