import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { Router } from '@angular/router';
import { ToastController, AlertController, PopoverController, ModalController } from '@ionic/angular';
import { NewCashLineComponent } from '../new-cash-line/new-cash-line.component';
import { AuthService } from 'src/app/auth/auth-service';
import { UtilityService } from 'src/app/utility.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.page.html',
  styleUrls: ['./new-payment.page.scss'],
})
export class NewPaymentPage implements OnInit, OnDestroy {

  paymentSub: Subscription;
  bankSub: Subscription;
  customerListSub: Subscription;
  banks: any;
  suggestLinesSub: Subscription;
  customers: any;
  updateSub: Subscription;
  priceGroupsSub: Subscription;
  priceGroups: any;

  
  saleType = [
    {'type': 'Cash', 'Code': 'Cash'},
    { 'type': 'Credit', 'Code': 'Credit'}
  ];

  card: Receipt = new Receipt();
  user: any;
  userID: string;
  Store_Code: string;

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
    this.setUser();
    this.DismissPopover();
    this.FetchBanks();
    this.FetchPriceGroups();
    this.newPayment(); 
  }

  ionViewWillEnter() {
    this.setUser();
  }

  ionViewDidEnter() {
    if(this.userID) {
      this.FetchCustomers();
    }
  }

  async setUser() {
    this.user = await this.authService.getUser();
    this.Store_Code = this.user.Store_Code;
    this.userID = this.user?.User_ID;
    console.log(this.userID);
  }

  newPayment(){
    this.card.Created_By = this.user?.User_ID;
    this.paymentSub = this.paymentService.newPayment(this.card).subscribe( receipt => {
      this.card = receipt;
      const curr = new Date();
      const formattedDate = this.paymentService.formatDate(curr);
      // this.card.Posting_Date = formattedDate;
    });
  }

  updateReceipt($event){
    this.card.Created_By = this.user?.User_ID;
    this.updateSub = this.paymentService.updateReceipt(this.card).subscribe( res => {
    
      if(typeof res === 'string')
      {
        // this.utilitySvc.showAlert(res);
        return false;
      }
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
    
      console.log(`User Found....`);
      console.table(this.user);
      this.utilitySvc.presentLoading('Loading Customers ....');
      this.customerListSub = this.paymentService.CustomerBySalesPerson(this?.userID)
      .pipe(
        finalize( async () => {
          this.utilitySvc.loadingCtrl.dismiss();
        })
      )
      .subscribe( cust => {
        this.customers = cust;
      });
    
   
  }

  FetchPriceGroups() {
    this.priceGroupsSub = this.paymentService.CustomerPriceGroups().subscribe(grps => {
        this.priceGroups = grps;
    })
  }

  async DismissPopover(){
    await this.popover.dismiss();
  }

  
  toView() {
    return this.router.navigate(['/','payments', this.card.POS_Receipt_No]);
  }

  ngOnDestroy() {
    if(this.paymentSub) {
      this.paymentSub.unsubscribe();
    } else if(this.bankSub) {
      this.bankSub.unsubscribe();
    } else if( this.customerListSub )
    {
      this.customerListSub.unsubscribe();
    } else if( this.suggestLinesSub ) {
      this.suggestLinesSub.unsubscribe();
    } else if( this.updateSub ) {
        this.updateSub.unsubscribe();
    } else if( this.priceGroupsSub ) {
        this.priceGroupsSub.unsubscribe();
    }
  }

}
