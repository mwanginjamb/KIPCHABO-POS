import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ItemService } from '../../items/item.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RequisitionService } from '../requisition.service';
import { Unit } from 'src/app/models/unit.model';
import { Requisitionline } from 'src/app/models/requisitionline.model';
import { ModalController, NavController, ToastController } from '@ionic/angular';


export enum Planning_Flexibility {
  a = 'Unlimited',
  b = 'None'
}

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent implements OnInit, OnDestroy {

  @Input() docId: string;

  items = [];
  itemSub: Subscription;
  units = [];
  unitSub: Subscription;

  line = new Requisitionline();
  constructor(private itemService: ItemService, private requisitionService: RequisitionService, private modalCtrl: ModalController,
              private navCtrl: NavController, private toastCtrl: ToastController ) { }

  ngOnInit() {

    this.itemSub = this.itemService.items.subscribe( items => {
      this.items = items;
    });
  }

  getUnit($event) {
    this.unitSub = this.requisitionService.getunits(this.line.Item_No).subscribe( units => {
     this.units = units;
     this.line.Document_No = this.docId;
     this.line.Planning_Flexibility = Planning_Flexibility.a;
     // console.log(this.docId);
 });
}

addLine() {
  this.requisitionService.postLine(this.line).subscribe( line => {
    // console.log(line);
    if ( line.Line_No ) {
      // this.navCtrl.navigateForward('/requisitions/' + this.docId);
      this.modalCtrl.dismiss();
      // Show a Toast Notification
      this.toastCtrl.create({
        message: `${line.Description} Requisition Line Added Successfully.`,
        duration: 2000
      }).then((toastData) => {
        toastData.present();
      });

    }
  });
}

// Closing component modal

onCancel() {
  this.modalCtrl.dismiss();
}

ngOnDestroy() {
  if (this.itemSub) {
    this.itemSub.unsubscribe();
  }

  if (this.unitSub) {
    this.unitSub.unsubscribe();
  }
}


}
