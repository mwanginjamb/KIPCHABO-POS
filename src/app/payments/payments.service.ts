import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Receipt } from '../models/receipt.model';
import { PopoverComponent } from '../orders/popover/popover.component';
import { OrderService } from '../orders/order.service';
import { ToastController } from '@ionic/angular';
import { Cashreceiptline } from '../models/cashreceiptline.model';
import { Customer } from '../models/customer.model';
import { Subject } from 'rxjs';
import { ITrasaction } from '../models/mpesa.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  url = environment.url;
  private _refresh$ = new Subject<void>();

  constructor( private http: HttpClient, private orderService: OrderService, private toastCtrl: ToastController) { }


  // Define a synthetic getter for the subject

  get refresh$() {
    return this._refresh$;
  }

  newPayment(receipt: Receipt ) {
      return this.http.post< Receipt >(`${this.url}site/cash-sale`, JSON.stringify(receipt) ); 
  }

  updateReceipt(receipt: Receipt) {
    return this.http.post< Receipt >(`${this.url}site/cash-sale`, JSON.stringify(receipt) );
  }

  getPayments(userID: string) {
    return this.http.get< Receipt[] >(`${this.url}site/get?service=POSReceiptList&userid=${userID}`).pipe(take(1));
  }

  getPayment(id: string){
    return this.http.get(`${this.url}site/receipt/?id=${id}`).pipe(take(1));
  }

  get Banks(){
    return this.http.get<[]>(`${this.url}site/get?service=BankAccounts`).pipe(take(1));
  }

  getLine(Key: string){
    return this.http.get< Cashreceiptline>(`${this.url}site/cash-sale-line?Key=${Key}`);
  }


  suggestlines(receiptNo: string, customerNo: string) {
    return this.http.get<{ return_value }>(`${this.url}site/suggestlines?receiptNo=${receiptNo}&customerNo=${customerNo}`).pipe(take(1));
  }

  // Post Lines Data

  postLine(line: Cashreceiptline) {
    return this.http.post< Cashreceiptline >(`${this.url}site/cash-sale-line`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._refresh$.next();
      } )
    );
  }

  // Update Line

  updateLine(line: Cashreceiptline) {
    return this.http.post< Cashreceiptline >(`${this.url}site/cash-sale-line`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._refresh$.next();
      } )
    );
  }

  get Customers() {
    return this.http.get(`${this.url}site/receipting-customers`).pipe(take(1));
  }

  /* 
   * Get Customer By Search Name
   */
  Customer(searchName: string) {
    return this.http.get(`${this.url}site/receipting-customers?searchName=${searchName}`).pipe(take(1));
  }

  /* 
   * Get Customer By Sales Person Code
   */

  CustomerBySalesPerson(salesPersonCode: string) {
    return this.http.get<Customer []>(`${this.url}site/receipting-customers?Salesperson_Code=${salesPersonCode}`).pipe(take(1));
  }

  // Get CustomerPriceGroups

  CustomerPriceGroups() {
    return this.http.get(`${this.url}site/get?service=CustomerPriceGroups`).pipe(take(1));
  }

  Mpesa() {
    return this.http.get<ITrasaction[]>(`${this.url}site/get?service=MPESATransactions`).pipe(take(1));
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
      // console.log(obj);
      for (const property in obj){
         if ( property === subjectColumn && !isNaN(+obj[property]) ){
          // console.log(+obj[property]);
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

  FilterReceipts(startDate, userID){
    return this.http.get< Receipt[] >(`${this.url}site/filterpayments?startdate=${startDate}&userid=${userID}`).pipe(take(1));
  }

  FilterReceiptsbyRange(startDate, endDate, userID){
    return this.http.get< Receipt[] >(`${this.url}site/filterpayments?startdate=${startDate}&enddate=${endDate}&userid=${userID}`).pipe(take(1));
  }

}
