import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from '../orders/popover/popover.component';
import { PaymentPopoverComponent } from './payment-popover/payment-popover.component';
import { PopoverController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PaymentsService } from './payments.service';
import { Receipt } from '../models/receipt.model';
import { PrintService } from './print.service';
import { BluetoothComponent } from './bluetooth/bluetooth.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit, OnDestroy {

  paymentsSub: Subscription;
  payments: Receipt[];
  isLoading = true;
  searchTerm: string = null;


  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private PaymentService: PaymentsService,
    public printService: PrintService
    ) { }

  ngOnInit() {
    this.FetchPayments();
  }

  ionViewDidEnter(){
      // this.showBluetoothDevices();
  }

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: PaymentPopoverComponent,
      event
    }).then(pop => {
      pop.present();
    });
  }

  FetchPayments() {
    this.paymentsSub = this.PaymentService.Payments.subscribe(result => {
      console.log(result);
      this.payments = [...result];
      this.isLoading = false;
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }

  searchPayment($event){
    const searchItems = [...this.payments];
    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.payments = searchItems.filter((payment) => {
        if ( payment.Customer_Name && payment.Customer_Name.length > 1 ){
          return ( payment.Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.FetchPayments();
    }
  }

  showBluetoothDevices(){
    this.modalCtrl.create(
      {
        component: BluetoothComponent,
      }
    ).then( modalEl => {
      modalEl.present();
    });
  }


  ngOnDestroy(){
    if ( this.paymentsSub ){
      this.paymentsSub.unsubscribe();
    }
  }

}
