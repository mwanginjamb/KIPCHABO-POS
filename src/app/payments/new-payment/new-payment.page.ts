import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { Router } from '@angular/router';
import { ToastController, AlertController, PopoverController, ModalController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/orders/popover/popover.component';
import { OrderService } from 'src/app/orders/order.service';
import { NewCashLineComponent } from '../new-cash-line/new-cash-line.component';
import { AuthService } from 'src/app/auth/auth-service';
import { UtilityService } from 'src/app/utility.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.page.html',
  styleUrls: ['./new-payment.page.scss'],
})
export class NewPaymentPage implements OnInit {

  paymentSub: Subscription;
  bankSub: Subscription;
  customerListSub: Subscription;
  banks: any;
  suggestLinesSub: Subscription;
  customers: any;
  updateSub: Subscription;

  saleType = [
    {'type': 'Cash', 'Code': 'Cash'},
    { 'type': 'Credit', 'Code': 'Credit'}
  ];

  card: Receipt = new Receipt();
  user: any;

  constructor(

    private paymentService: PaymentsService,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popover: PopoverController,
    private modalCtrl: ModalController,
    private utilitySvc: UtilityService
    ) { }

  ngOnInit() {
    this.DismissPopover();
    this.FetchBanks();
    this.FetchCustomers();
    this.newPayment();
    this.setUser();
  }

  ionViewWillEnter() {
    this.setUser();
  }

  ionViewDidEnter() {
    this.setUser();
  }

  async setUser() {
    this.user = await this.authService.getUser();
  }

  newPayment(){
    this.paymentSub = this.paymentService.newPayment().subscribe( receipt => {
      console.log(typeof receipt);
      this.card = receipt;
      const curr = new Date();
      const formattedDate = this.paymentService.formatDate(curr);
      // this.card.Posting_Date = formattedDate;
    });
  }

  FetchBanks(){
    this.bankSub = this.paymentService.Banks.subscribe( result => {
      this.banks = result;
    });
  }

  Suggestlines(receiptNo: string, customerNo: string){
      this.suggestLinesSub = this.paymentService.suggestlines(receiptNo, customerNo).subscribe( res => {
        if ( res.return_value > 0 ) {
          // Show a Toast Notification
          this.toastCtrl.create({
            message: `Invoice Lines Suggested Successfully.`,
            duration: 2000,
            position: 'top'
          }).then((toastData) => {
            toastData.present();
            this.router.navigate(['/', 'payments', receiptNo]);
          });
        } else {
          console.log(res);
          this.alertCtrl.create({
            header: 'Operation Error',
            message: 'Message : ' + res,
            buttons: [{ text: 'Okay' }]
          }).then( alertEl => {
            alertEl.present();
          });
        }
      }, error => {
        console.log(error.error);
        this.alertCtrl.create({
          header: 'Service Error!',
          message: 'Connection problem: ' + error ,
          buttons: [{ text: 'Okay' }]
        })
        .then(alertEl => {
          alertEl.present();
        });
      });
  }

  onAddLine(POS_Receipt_No: string)
  {
    this,this.modalCtrl.create(
      {
        component: NewCashLineComponent,
        componentProps: { receiptNo: POS_Receipt_No }
      }
    )
    .then( modalEl => {
      modalEl.present();
    });
  }

  FetchCustomers() {
    this.utilitySvc.presentLoading('Loading Customers ....');
    this.customerListSub = this.paymentService.Customers
    .pipe(
      finalize( async () => {
        this.utilitySvc.loadingCtrl.dismiss();
      })
    )
    .subscribe( cust => {
      console.log(cust);
      this.customers = cust;
    });
  }

  async DismissPopover(){
    await this.popover.dismiss();
  }

  updateReceipt($event){
    this.card.Created_By = this.user?.User_ID;
    console.table(this.card);
    this.updateSub = this.paymentService.updateReceipt(this.card).subscribe( res => {
      console.log(res);
      if (typeof res === 'object') {
          Object.assign(this.card, res);
          this.toastCtrl.create({
            message: `Receipt Updated Successfully.`,
            duration: 2000,
            position: 'top'
          }).then((toastData) => {
            toastData.present();
          });
      }
    }, error => {
      this.alertCtrl.create({
        header: 'New Payment Error!',
        message: 'Connection problem: ' + error ,
        buttons: [{ text: 'Okay' }]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
  }

  toView() {
    return this.router.navigate(['/','payments', this.card.POS_Receipt_No]);
  }

}
