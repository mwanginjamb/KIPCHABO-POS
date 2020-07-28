import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Subscription } from 'rxjs';
import { Salesorder } from '../models/salesorder.model';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
   orders: Invoice[];
   orderSub: Subscription;
   isLoading = false;

  constructor( private orderService: OrderService, private popoverCtrl: PopoverController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.orderSub = this.orderService.orders.subscribe(result => {
      console.log(result);
      this.orders = [...result];
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

  ionViewWillEnter() {
  }

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: PopoverComponent,
      event
    }).then(pop => {
      pop.present();
    });
  }

  ngOnDestroy() {
    if (this.orderSub ) {
      this.orderSub.unsubscribe();
    }
  }

}
