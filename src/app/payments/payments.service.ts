import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Receipt } from '../models/receipt.model';
import { PopoverComponent } from '../orders/popover/popover.component';
import { OrderService } from '../orders/order.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

url = environment.url;

  constructor( private http: HttpClient, private orderService: OrderService, private toastCtrl: ToastController) { }

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

  selectLine(CustomerNo: string, Line: number, ReceiptNo: string){
    const payload = {Customer_No: CustomerNo, Line_No: Line, Receipt_No: ReceiptNo };
    return this.http.post(`${this.url}site/updatecashreceiptline`, JSON.stringify(payload));
  }

  setAmountToReceipt(CustomerNo: string, Line: number, ReceiptNo: string, AmountToReceipt: number){
    const payload = {Customer_No: CustomerNo, Line_No: Line, Receipt_No: ReceiptNo, Amount_To_Receipt: AmountToReceipt  };
    // console.log(payload); return;
    return this.http.post(`${this.url}site/updateamounttoreceipt`, JSON.stringify(payload));
  }

  postReceipt(No){
    return this.http.get(`${this.url}site/postreceipt?No=${No}`);
  }

  getTotals(elements, subjectColumn){
    let sum = 0;
    elements.forEach(obj => {
      console.log(obj);
      for (const property in obj){
         if ( property === subjectColumn && !isNaN(+obj[property]) ){
          console.log(+obj[property]);
          sum += +obj[property];
        }
      }
    });
    return sum;
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

  formatDate(date){
    return this.orderService.formatDate(date);
  }

  FilterReceipts(startDate){
    return this.http.get< Receipt[] >(`${this.url}site/filterpayments?startdate=${startDate}`).pipe(take(1));
  }

  FilterReceiptsbyRange(startDate, endDate){
    return this.http.get< Receipt[] >(`${this.url}site/filterpayments?startdate=${startDate}&enddate=${endDate}`).pipe(take(1));
  }

}
