import { Component, OnInit } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { CollectionPopoverComponent } from './collection-popover/collection-popover.component';
import { CollectionService } from "./collection.service";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.page.html",
  styleUrls: ["./collection.page.scss"],
})
export class CollectionPage implements OnInit {
  Items: any;
  isLoading = true;
  itemSub: Subscription;
  searchTerm: string = null;

  constructor(
    private collectionService: CollectionService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemSub = this.collectionService.Collections.subscribe(
      (result) => {
        console.log(result[0]);
        this.Items = [...result];
        this.isLoading = false;
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
      component: CollectionPopoverComponent,
      event
    });

    return await popover.present();

  }

}
