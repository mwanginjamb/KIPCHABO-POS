import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Receipt } from '../models/receipt.model';
import { PopoverComponent } from '../orders/popover/popover.component';
import { OrderService } from '../orders/order.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

url = environment.url;

  constructor( private http: HttpClient, private orderService: OrderService) { }

  get Payments() {
    return this.http.get< Receipt[] >(`${this.url}site/get?service=Payments`).pipe(take(1));
  }

  getPayment(id: string){
    return this.http.get(`${this.url}site/receipt/?id=${id}`).pipe(take(1));
  }

  get Banks(){
    return this.http.get<[]>(`${this.url}site/get?service=BankAccounts`).pipe(take(1));
  }

  newPayment() {
    return this.http.get<Receipt>(`${this.url}site/newpayment`).pipe(take(1));
  }

  suggestlines(receiptNo: string, customerNo: string) {
    return this.http.get<{ return_value }>(`${this.url}site/suggestlines?receiptNo=${receiptNo}&customerNo=${customerNo}`).pipe(take(1));
  }

  updateReceipt(receipt: Receipt){
    receipt.Posting_Date = this.orderService.formatDate(receipt.Posting_Date);
    return this.http.post<Receipt>(`${this.url}site/updatecashreceipt`, JSON.stringify(receipt));
  }

  get Customers() {
    return this.http.get(`${this.url}site/receipting-customers`).pipe(take(1));
  }

}
