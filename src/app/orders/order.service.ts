import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salesorderline } from '../models/salesorderline.model';
import { Salesorder } from '../models/salesorder.model';
import { Invoice } from '../models/invoice.model';
import { Salesinvoiceline } from '../models/salesinvoiceline.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.url;

  // private items  = new BehaviorSubject<[]>([]) ;

  constructor( private http: HttpClient) { }

  get orders() {
    return this.http.get< Invoice[] >(`${this.url}site/saleinvoices`).pipe(take(1));
  }

  // Create New Sales Invoice

  createInvoice() {
    return this.http.get< Invoice >(`${this.url}site/create-invoice`);
  }

   // Retrieve Sales Invoice Card / Details
   ordercard(id: string) {
    return this.http.get< Invoice >(`${this.url}site/saleinvoice/?id=${id}`);
  }

  // Post Lines Data
  postLine(line: Salesinvoiceline) {
    return this.http.post< Salesinvoiceline >(`${this.url}site/addsalesinvoiceline`, JSON.stringify(line) );
  }

  // Update Line

  updateInvoiceLine(line: Salesinvoiceline) {
    return this.http.post< Salesinvoiceline >(`${this.url}site/updatesalesinvoiceline`, JSON.stringify(line) );
  }

  // Fetch Line to Update
  getLine(docId: number, LineNo: string){
    return this.http.get< Salesorderline >(`${this.url}site/getsalesinvoiceline?Document_No=${docId}&Line_No=${LineNo}`);
  }

  // Post Invoice Header

  postInvoice(invoice: Invoice) {
    invoice.Posting_Date = this.formatDate(invoice.Posting_Date);
    invoice.Due_Date = this.formatDate(invoice.Due_Date);
    return this.http.post<Invoice>(`${this.url}site/update-invoice`, JSON.stringify(invoice) );
  }

  // Get Customers

  get Customers() {
    return this.http.get(`${this.url}site/receipting-customers`).pipe(take(1));
  }

  postSalesInvoice(No){
    return this.http.get(`${this.url}site/postsaleinvoice?No=${No}`);
  }

  // Format date utility

  formatDate(datestring: string) {
    // Format Date to YYYY-MM-DD
    const recDate = new Date(datestring);
    const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
    const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
    return  `${recDate.getFullYear()}-${month}-${day}`;
  }

}
