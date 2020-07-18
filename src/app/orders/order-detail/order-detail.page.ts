import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

 order: Order ;

  constructor( private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if ( !paramMap.has('orderNo')) {
          // redirect back
          return;
      }
      const No = paramMap.get('orderNo');
      console.log(No);

      this.getOrder(No).subscribe(data => {
        console.log(data[0]);
        this.order = data[0];
      });

    });
    
  }

   getOrder(No){
    return  this.orderService.getOrder(No);
  }



}
