import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Postedsalesinvoice } from '../models/postedsalesinvoice.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  get Sales() {
    return this.http.get< Postedsalesinvoice[] >(`${this.url}site/get?service=PostedSalesInvoices`).pipe(take(1));
  }

  getSale(id: string){
    return this.http.get< Postedsalesinvoice >(`${this.url}site/sale/?id=${id}`).pipe(take(1));
  }
}
