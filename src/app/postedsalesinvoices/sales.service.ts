import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Postedsalesinvoice } from '../models/postedsalesinvoice.model';
import { PaymentsService } from '../payments/payments.service';
import { OrderService } from '../orders/order.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = environment.url;
  constructor(private http: HttpClient, private orderService: OrderService, private toastCtrl: ToastController) { }

  Sales(userID: string) {
    return this.http.get< Postedsalesinvoice[] >(`${this.url}site/get?service=PostedSalesInvoices&userid=${userID}`).pipe(take(1));
  }

  getSale(id: string){
    return this.http.get< Postedsalesinvoice >(`${this.url}site/sale/?Key=${id}`).pipe(take(1));
  }

  formatDate(date){
    return this.orderService.formatDate(date);
  }

  FilterSales(startDate, userID){
    return this.http.get< Postedsalesinvoice[] >(`${this.url}site/filtersales?startdate=${startDate}&userid=${userID}`).pipe(take(1));
  }

  FilterSalesbyRange(startDate, endDate, userID){
    return this.http.get< Postedsalesinvoice[] >(`${this.url}site/filtersales?startdate=${startDate}&enddate=${endDate}&userid=${userID}`).pipe(take(1));
  }

  async showToast(text){
    return await this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'top'
    }).then( toastEl => {
      toastEl.present();
    });
  }


}
