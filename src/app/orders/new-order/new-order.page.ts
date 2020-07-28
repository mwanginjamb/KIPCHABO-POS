import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  orderSub: Subscription;
  customerListSub: Subscription;
  InvoiceSub: Subscription;

  invoice: Invoice = new Invoice();
  customers: any;
  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit() {
    this.popoverCtrl.dismiss();
    this.InitInvoice();
    this.fetchCustomers();
  }

  InitInvoice() {
    this.InvoiceSub = this.orderService.createInvoice().subscribe(result => {
      Object.assign(this.invoice, result);
    });
  }

  onInvoiceupdate(form: NgForm) {
    this.orderSub = this.orderService.postInvoice(this.invoice).subscribe(res => {
      if ( typeof res !== 'string' ) {
        // Show a Toast Notification
        this.toastCtrl.create({
          message: `${res.No} Sales Invoice Created Successfully.`,
          duration: 2000,
          position: 'top'
        }).then((toastData) => {
          toastData.present();
          this.router.navigate(['/', 'orders', res.No]);
        });
      } else {
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

  fetchCustomers() {
    this.customerListSub = this.orderService.Customers.subscribe( cust => {
      this.customers = cust;
    });
  }

}
