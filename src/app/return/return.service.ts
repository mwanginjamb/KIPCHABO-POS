import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Return } from '../models/return.model';
import { Returnline } from '../models/returnline.model';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  url = environment.url;

  constructor( 
    private http: HttpClient,
    private utilitySvc: UtilityService) { }

  formatDate(date) {
    return this.utilitySvc.formatDate(date);
  }

  // Can create or Update
  ReturnTransaction(returnData: Return) {
    return this.http.post<Return>(`${this.url}site/return`, JSON.stringify(returnData)).pipe(take(1));
  }

  // Read a single Return

  getReturnTransaction(Key: string){
    return this.http.get<Return>(`${this.url}site/view-return/?Key=${Key}`).pipe(take(1));
  }


// Get a list of returns for a particular user

  getReturnTransactions(userID: string) {
    return this.http.get< Return[] >(`${this.url}site/get?service=POSReturnList&userid=${userID}`).pipe(take(1));
  }

  // Add Update Return Line

  returnLine(lineData: Returnline) {
    return this.http.post<Returnline>(`${this.url}site/return-line`, JSON.stringify(lineData));
  }

  // Fetch return Line By Key

  fetchLine(Key: string) {
    return this.http.get<Returnline>(`${this.url}site/fetch-return-line?Key=${Key}`);
  }



}
