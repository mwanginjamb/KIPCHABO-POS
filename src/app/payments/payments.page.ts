import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from '../orders/popover/popover.component';
import { PaymentPopoverComponent } from './payment-popover/payment-popover.component';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PaymentsService } from './payments.service';
import { Receipt } from '../models/receipt.model';

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
    private PaymentService: PaymentsService
    ) { }

  ngOnInit() {
    this.FetchPayments();
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

  }

  ngOnDestroy(){
    if ( this.paymentsSub ){
      this.paymentsSub.unsubscribe();
    }
  }

}
