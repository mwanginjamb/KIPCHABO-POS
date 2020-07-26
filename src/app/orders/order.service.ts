import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salesorderline } from '../models/salesorderline.model';
import { Salesorder } from '../models/salesorder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.url;

  // private items  = new BehaviorSubject<[]>([]) ;

  constructor( private http: HttpClient) { }

  get orders() {
    return this.http.get< Salesorder[] >(`${this.url}site/saleorders`).pipe(take(1));
  }

   // Retrieve Requisition Card / Details
   ordercard(id: string) {
    return this.http.get< Salesorder >(`${this.url}site/salesorder/?id=${id}`);
  }
}
