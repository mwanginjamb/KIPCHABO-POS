import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from '../orders/popover/popover.component';
import { PaymentPopoverComponent } from './payment-popover/payment-popover.component';
import { PopoverController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PaymentsService } from './payments.service';
import { Receipt } from '../models/receipt.model';
import { PrintService } from './print.service';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { AuthService } from '../auth/auth-service';

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
  user: any;
  userID: string;


  constructor(
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private PaymentService: PaymentsService,
    public printService: PrintService,
    public authService: AuthService
    ) { }

  ngOnInit() {
    
    this.setUser();

  }

  ionViewWillEnter() {
    this.setUser();
  }
  
  ionViewDidEnter() {
    this.setUser();
    console.table(this.user);
    console.log('Did Enter');
    this.FetchPayments();
  }

  async setUser() {
    this.user = await this.authService.getUser();
    this.userID = this.user?.User_ID;
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
    
    this.paymentsSub = this.PaymentService.getPayments(this.userID).subscribe(result => {
      console.log(result);
      this.payments = this.sort([...result]);
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

  sort(dataArray: Receipt[]){
    return dataArray.sort((a,b) => (b.POS_Receipt_No > a.POS_Receipt_No) ? 1: -1);
  }

  ngOnDestroy(){
    if ( this.paymentsSub ){
      this.paymentsSub.unsubscribe();
    }
  }

}
