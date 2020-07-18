import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/order';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  // private items  = new BehaviorSubject<[]>([]) ;

  constructor( private http: HttpClient) { }

  get orders() {
      return this.http.get<[]>('http://localhost:7016/site/items').pipe(take(1));
  }

  getOrder(orderId: number){
    return this.http.get(`http://localhost:7016/site/getone/?id=${orderId}`);
  }
   
}
