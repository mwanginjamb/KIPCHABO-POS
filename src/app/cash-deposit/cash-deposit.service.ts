import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cashdeposit } from '../models/cashdeposit.model';
import { Cashdepositheader } from '../models/cashdepositheader.model';
import { Cashdepositline } from '../models/cashdepositline.model';

@Injectable({
  providedIn: 'root'
})
export class CashDepositService {

  url = environment.url;
  private _cashRefresh$ = new Subject<{}>();
  private _lineRefresh$ = new Subject<{}>();

  constructor( private http: HttpClient) { }

  // Synthetic getter for peeping into subject

  get cashrefresh$() {
    return this._cashRefresh$;
  }

  get lineRefresh$() {
    return this._lineRefresh$;
  }




  // Retrieve all records in list

  getCashdeposits(userID: string) {
    return this.http.get<Cashdeposit[]>(`${this.url}site/get?service=CashDepositList&userid=${userID}`).pipe(take(1));
  }

  newDeposit(userID: string ) {
   // console.table(deposit); return;
    return this.http.get< string >(`${this.url}site/create-cash-deposit?UserID=${userID}`); 
  }

  updateDeposit(deposit: Cashdepositheader) {
    return this.http.post< Cashdeposit >(`${this.url}site/cashdeposit`, JSON.stringify(deposit) );
  }

  // View the card

  getCard(Key: string){
    return this.http.get(`${this.url}site/view-cashdeposit/?Key=${Key}`).pipe(take(1));
  }

  getCardByNo(No: string){
    return this.http.get< Cashdeposit >(`${this.url}site/cash-deposit-card/?No=${No}`).pipe(take(1));
  }

  postDocument(No: string) {
    // post-cashdeposit
    return this.http.get(`${this.url}site/post-cashdeposit/?No=${No}`).pipe(take(1));
  }



  /**Process Lines */

  // Get Line

  getLine(Key: string){
    return this.http.get< Cashdepositline>(`${this.url}site/fetch-cashdeposit-line?Key=${Key}`);
  }

  // Post Lines Data

  postLine(line: Cashdepositline) {
    return this.http.post< Cashdepositline >(`${this.url}site/cashdeposit-line`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._lineRefresh$.next(line);
      } )
    );
  }

  // Update Line

  updateLine(line: Cashdepositline) {
    return this.http.post< Cashdepositline >(`${this.url}site/cashdeposit-line`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._lineRefresh$.next(line);
      } )
    );
  }




}
