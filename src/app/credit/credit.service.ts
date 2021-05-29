import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  get creditList() {
    return this.http.get< Credit[] >(`${this.url}site/get?service=POSCreditList`).pipe(take(1));
  }
}
