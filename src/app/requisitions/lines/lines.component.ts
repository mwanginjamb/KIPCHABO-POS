import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ItemService } from '../../items/item.service';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { RequisitionService } from '../requisition.service';
import { Unit } from 'src/app/models/unit.model';
import { Requisitionline } from 'src/app/models/requisitionline.model';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


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

  loading: HTMLIonLoadingElement;
  @Input() docId: string;
  @Input() Key: string;

  items = [];
  itemSub: Subscription;
  updateLineSub: Subscription;
  units = [];
  unitSub: Subscription;

  line: Requisitionline = new Requisitionline();
  constructor(
      private itemService: ItemService,
      private requisitionService: RequisitionService,
      private modalCtrl: ModalController,
      private navCtrl: NavController,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private router: Router,
       ) { }

  ngOnInit() {

    this.presentLoading('Loading Items...');
    this.itemSub = this.itemService.items
    .pipe(
      finalize( async() => {
        await this.loading.dismiss();
      })
    )
    .subscribe( items => {
      this.items = items;
    });
    // If a Line_No is provided, then we are updating
    if ( this.Key ){
      this.FetchLinetoUpdate();
    }
  }

  getUnit($event) {
    this.unitSub = this.requisitionService.getunits(this.line.Item_No).subscribe( units => {
     this.units = units;
     this.line.Req_No = this.docId;
     // console.log(this.docId);
 });
}

addLine() {
  this.requisitionService.postLine(this.line).subscribe( line => {
    console.log(line);
    if ( typeof line == 'object' ) {
      this.modalCtrl.dismiss();
      // Show a Toast Notification
      this.toastCtrl.create({
        message: `Requisition Line Added Successfully.`,
        duration: 2000,
        position: 'top'
      }).then((toastData) => {
        toastData.present();
      });
    } else {
      this.alertCtrl.create({
        header: 'Operation Error',
        message: 'Error : ' + line,
        buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
      }).then( alertEl => {
        alertEl.present();
      });
    }
  }, error => {
    console.log(error.error);
    this.alertCtrl.create({
      header: 'Service Error!',
      message: 'Connection problem: ' + error ,
      buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
    })
    .then(alertEl => {
      alertEl.present();
    });
  });
}

updateLine() {

// Format Date to YYYY-MM-DD
// const recDate = new Date(this.line.Receipt_Date);
// const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
// const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
// this.line.Receipt_Date =  `${recDate.getFullYear()}-${month}-${day}`;
// console.table(this.line); return;

this.requisitionService.updateRequisitionLine(this.line).subscribe( line => {
    if ( typeof line !== 'string'){
        console.log(`Updated Line.......`);
        console.table(line);
        this.toastCtrl.create({
          message: `${line.Description} Requisition Line Updated Successfully.`,
          duration: 3000,
          position: 'top'
        }).then((toastData) => {
          toastData.present();
        });

        this.modalCtrl.dismiss();
        // this.router.navigate(['/requisitions/' + line.Document_No]);

    }else {
       // Alert the error
       this.alertCtrl.create(
        {
          header: 'Operation Error',
          message: 'Message : ' + line,
          buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
        }
      ).then( alertEl => {
        alertEl.present();
      });
    }
}, error => {
    console.log(error.error);
    this.alertCtrl.create({
      header: 'Service Error!',
      message: 'Connection problem: ' + error.error ,
      buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
    })
    .then(alertEl => {
      alertEl.present();
    });
});

}

FetchLinetoUpdate(){
  this.updateLineSub = this.requisitionService.getLine(this.Key)
  .subscribe(res => {
   Object.assign(this.line, res);
  }, error => {
    console.log(error.error);
    this.alertCtrl.create({
      header: 'Service Error!',
      message: 'Connection problem: ' + error.error.message ,
      buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
    })
    .then(alertEl => {
      alertEl.present();
    });
  });
}

// Closing component modal

onCancel() {
  this.modalCtrl.dismiss();
}

async presentLoading(message?: string) {
  this.loading = await this.loadingCtrl.create({
    spinner: 'dots',
    animated: true,
    message: (message)? message:'Loading..'
  });

  await this.loading.present();
}


ngOnDestroy() {
  if (this.itemSub) {
    this.itemSub.unsubscribe();
  }

  if (this.unitSub) {
    this.unitSub.unsubscribe();
  }

  if (this.updateLineSub) {
    this.updateLineSub.unsubscribe();
  }

}


}
