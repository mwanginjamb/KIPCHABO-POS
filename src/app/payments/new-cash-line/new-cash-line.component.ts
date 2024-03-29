import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RequisitionService } from 'src/app/requisitions/requisition.service';
import { PaymentsService } from '../payments.service';
import { Location } from 'src/app/models/location.model'
import { finalize } from 'rxjs/operators';
import { ItemService } from 'src/app/items/item.service';
import { Cashreceiptline } from 'src/app/models/cashreceiptline.model';
import { AuthService } from 'src/app/auth/auth-service';


@Component({
  selector: 'app-new-cash-line',
  templateUrl: './new-cash-line.component.html',
  styleUrls: ['./new-cash-line.component.scss'],
})
export class NewCashLineComponent implements OnInit, OnDestroy {

  @Input() receiptNo: string;
  @Input() Key: string;

  items = [];
  itemSub: Subscription;
  locations: Location[];
  locationSub: Subscription;
  updateLineSub: Subscription;
  loading: HTMLIonLoadingElement;
  line: Cashreceiptline = new Cashreceiptline();
  user: any;
  Store_Code: string;

  constructor(
    private paymentService: PaymentsService,
    private requisitionService: RequisitionService,
    private itemService: ItemService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.presentLoading();
    this.fetchItems();
    this.fetchLocations();
    this.setUser();

    this.line.Store_Code = this.Store_Code;

    

    if ( this.Key ){ //Update
      this.FetchLinetoUpdate();
    }else if(!this.Key) { // Create
      this.line.POS_Receipt_No = this.receiptNo;
      
    }
  }

  ionViewWillEnter() {
    this.setUser();
  }

  ionViewDidEnter() {
    this.setUser();
  }

  async setUser() {
    this.user = await this.authService.getUser();
    this.Store_Code = this.user.Store_Code;
    this.line.Store_Code = this.Store_Code;
   
  }

  fetchLocations() {
    this.locationSub = this.requisitionService.getLocations()
    .pipe(
      finalize(async() => {
        await this.loading.dismiss()
      })
    )
    .subscribe( res => {
      this.locations = res;
      // console.table(res);
    });
  }

  fetchItems() {
    this.itemSub = this.itemService.items
    .pipe(
      finalize( async() => {
        await this.loading.dismiss();
      })
    )
    .subscribe( items => {
      this.items = items;
    });
  }

  InitLine()
  {
    this.setUser();
    console.log(`Store Code : ${this.Store_Code}`);
    this.paymentService.postLine(this.line).subscribe( line => {
      
      if ( line ) {
        this.line = line;
        this.line.Store_Code = this.Store_Code;
      } else {
        this.alertCtrl.create({
          header: 'Operation Error',
          message: 'Message : ' + line,
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

  addLine() {
    this.paymentService.postLine(this.line).subscribe( line => {
      console.log(line);
      if ( line ) {
        this.modalCtrl.dismiss();
        // Show a Toast Notification
        this.toastCtrl.create({
          message: `Line Added Successfully.`,
          duration: 2000,
          position: 'top'
        }).then((toastData) => {
          toastData.present();
        });
      } else {
        this.alertCtrl.create({
          header: 'Operation Error',
          message: 'Message : ' + line,
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
  this.paymentService.updateLine(this.line).subscribe( line => {
      if ( typeof line !== 'string'){   
          this.toastCtrl.create({
            message: `${line.Description} Line Updated Successfully.`,
            duration: 3000,
            position: 'top'
          }).then((toastData) => {
            toastData.present();
          });
          this.modalCtrl.dismiss();   
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
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
      })
      .then(alertEl => {
        alertEl.present();
      });
  });
  
  }

  FetchLinetoUpdate(){
    this.updateLineSub = this.paymentService.getLine(this.Key)
    .subscribe(res => {
     Object.assign(this.line, res);
    }, error => {
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

async presentLoading(message?: string) {
  this.loading = await this.loadingCtrl.create({
    spinner: 'dots',
    animated: true,
    message: (message)? message:'Loading..'
  });
  await this.loading.present();
}

onCancel() {
  this.modalCtrl.dismiss();
}

ngOnDestroy()
{
  if(this.itemSub){
    this.itemSub.unsubscribe();
  }

  if(this.locationSub) {
    this.locationSub.unsubscribe();
  }

  if(this.updateLineSub) {
    this.updateLineSub.unsubscribe();
  }
}





}
