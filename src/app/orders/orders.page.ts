import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Subscription } from 'rxjs';
import { Salesorder } from '../models/salesorder.model';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
   orders: Salesorder[];
   orderSub: Subscription;
   isLoading = false;

  constructor( private orderService: OrderService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.isLoading = true;
    this.orderSub = this.orderService.orders
    .subscribe(result => {
      console.log(result);
      this.orders = [...result];
      this.isLoading = false;
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
