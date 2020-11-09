import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { Router } from '@angular/router';
import { ToastController, AlertController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/orders/popover/popover.component';
import { OrderService } from 'src/app/orders/order.service';

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

  card: Receipt = new Receipt();

  constructor(

    private paymentService: PaymentsService,
    private orderService: OrderService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popover: PopoverController,
    ) { }

  ngOnInit() {
    this.DismissPopover();
    this.FetchBanks();
    this.FetchCustomers();
    this.newPayment();
  }

  newPayment(){
    this.paymentSub = this.paymentService.newPayment().subscribe( receipt => {
      console.log(typeof receipt);
      this.card = receipt;
      const curr = new Date();
      const formattedDate = this.paymentService.formatDate(curr);
      this.card.Posting_Date = formattedDate;
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

  FetchCustomers() {
    this.customerListSub = this.paymentService.Customers.subscribe( cust => {
      console.log(cust);
      this.customers = cust;
    });
  }

  async DismissPopover(){
    await this.popover.dismiss();
  }

  updateReceipt(card){
    this.updateSub = this.paymentService.updateReceipt(card).subscribe( res => {
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
        header: 'Service Error!',
        message: 'Connection problem: ' + error ,
        buttons: [{ text: 'Okay' }]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
  }

}
