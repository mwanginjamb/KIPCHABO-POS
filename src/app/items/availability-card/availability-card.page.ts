import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { Itembalance } from 'src/app/models/itembalance.model';
import { Subscription } from 'rxjs';
import { Itemledgerentry } from 'src/app/models/itemledgerentry.model';
import { Item } from '../item.model';
import { Location } from 'src/app/models/location.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-card.page.html',
  styleUrls: ['./availability-card.page.scss'],
})
export class AvailabilityCardPage implements OnInit, OnDestroy {

  itemList: Itemledgerentry[];
  cardSub: Subscription;
  ledgerSub: Subscription;
  locationSub: Subscription;
  TotalRemainingQuantity: number;
  ItemCard: Item;
  locations: any;
  searchLocation: string;
  ItemNo: string;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) {
    this.TotalRemainingQuantity = 0;
  }

  ngOnInit() {
    this.ItemNo = this.activatedRoute.snapshot.paramMap.get('No');

    // Get Item Balance Card
    this.ledgerSub = this.itemService.itemBalance(this.ItemNo).subscribe(res => {
      // console.log(typeof res[Symbol.iterator]);
      this.itemList = res;
      // Check if response of an object and if that object is iterable
      if (typeof res === 'object' && typeof res[Symbol.iterator] === 'function'){
        this.TotalRemainingQuantity = this.itemService.getTotals(res, 'Remaining_Quantity');
        console.log(`Remaining Quantities are : ${this.TotalRemainingQuantity}`);
      }else{
        this.itemService.showToast('Selected Store has no inventory record for such an item . ');
      }

    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });

    // Get Item Description
    this.cardSub = this.itemService.itemcard(this.ItemNo).subscribe(result => {
       this.ItemCard = [... result][0];
    });

    // Get Locations

    this.locationSub = this.itemService.getLocations().subscribe(locs => {
      this.locations = locs;
    });

  }

  searchByLocation($event){
    if ($event.target.value.length){
       // Get Item Balance Card
    this.ledgerSub = this.itemService.itemBalanceByLocation(this.ItemNo, $event.target.value ).subscribe(res => {
       console.log(typeof res[Symbol.iterator]);
       this.itemList = res;
       if (typeof res === 'object' && typeof res[Symbol.iterator] === 'function'){
       this.TotalRemainingQuantity = this.itemService.getTotals(res, 'Remaining_Quantity');
       console.log(`Remaining Quantities By Loc are : ${this.TotalRemainingQuantity}`);
       }else{
        this.itemService.showToast('Selected Store has no inventory record for such an item . ');
       }
     }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
    }

  }

  ngOnDestroy(){
    if (this.cardSub){
      this.cardSub.unsubscribe();
    }

    if (this.cardSub){
      this.cardSub.unsubscribe();
    }

    if (this.locationSub){
      this.locationSub.unsubscribe();
    }
  }

}
