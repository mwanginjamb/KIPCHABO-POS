import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequisitionService } from '../requisition.service';
import { ActivatedRoute } from '@angular/router';
import { Requisition } from '../../requisitions/requisition.model';
import { ModalController } from '@ionic/angular';
import { LinesComponent } from '../lines/lines.component';
import { ItemService } from 'src/app/items/item.service';
import { Subscription } from 'rxjs';
import { Requisitionline } from 'src/app/models/requisitionline.model';



@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.page.html',
  styleUrls: ['./requisition-details.page.scss'],
})
export class RequisitionDetailsPage implements OnInit, OnDestroy {

card: Requisition;
items = [];
itemSub: Subscription;
units = [];
unitSub: Subscription;
cardSub: Subscription;
id = null;

line = new Requisitionline();



model = {};

  constructor(
    private requisitionService: RequisitionService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.itemSub = this.itemService.items.subscribe( items => {
      this.items = items;
    });

    // get card details

    this.cardSub = this.requisitionService.requisitioncard(this.id).subscribe( cardInfo => {
      this.card = [...cardInfo][0];
      // console.log(this.card.TransferLines?.Transfer_Order_Line);
    });
  }

  // Show Line modal form
  onAddLine() {
     this.modalCtrl.create(
       {
         component: LinesComponent,
         componentProps: { docId: this.id }
       }
     ).then( modalEl => {
       modalEl.present();
     });
  }

// Get Units of Measure
  getUnit() {
      this.unitSub = this.requisitionService.getunits(this.line.Item_No).subscribe( units => {
      this.units = units;
      console.log(this.units);
    });
  }


  /* addLine() {
    this.requisitionService.postLine(this.line).subscribe( line => {
      console.log(line.Line_No);
    });
   }*/

   ngOnDestroy() {

     if ( this.itemSub ) {
       this.itemSub.unsubscribe();
     }

     if ( this.unitSub ) {
       this.unitSub.unsubscribe();
     }

     if ( this.cardSub ) {
       this.cardSub.unsubscribe();
     }
   }



}
