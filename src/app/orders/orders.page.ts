import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
   Navorders: any;
   itemSub: Subscription;

  constructor( private orderService: OrderService) { }

  ngOnInit() {
    this.itemSub = this.orderService.orders
    .subscribe(result => {
      console.log(result);
      this.Navorders = [...result];
    });

  }

  ionViewWillEnter() {
  }

  ngOnDestroy() {
    if (this.itemSub ) {
      this.itemSub.unsubscribe();
    }
  }

}
