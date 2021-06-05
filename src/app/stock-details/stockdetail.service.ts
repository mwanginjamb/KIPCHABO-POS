import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stockissue } from '../models/stockissue.model';
import { Unit } from '../models/unit.model';
import { take } from 'rxjs/operators';
import { Stockissueline } from '../models/stockissueline.model';
import { StockDetailsPage } from './stock-details.page';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class StockdetailService {
  url = environment.url;
  constructor( 
    private http: HttpClient,
    private toastCtrl: ToastController) { }

  get releasedrequisitions() {
    return this.http.get< Stockissue[] >(`${this.url}site/releasedrequisitions`).pipe(take(1));
  }

  // Retrieve Stock Issue Card / Details
  requisitioncard(id: string) {
    return this.http.get<Stockissue>(`${this.url}site/stockissue/?id=${id}`);
  }

  // Create New Requisition

  createRequisition() {
    return this.http.get< Stockissue >(`${this.url}site/create-requisition`);
  }

  //Update Stock Issue

  updateStockIssue(Card: Stockissue) {
    return this.http.post< Stockissue >(`${this.url}site/stock-issue-card`, JSON.stringify(Card) );
  }

  // get Units of Measure

  getunits(itemNo: string) {
    return this.http.get< Unit >(`${this.url}site/unitmeasure?itemNo=${itemNo}`).pipe(take(1));
  }

  // Get Locations List

  getLocations() {
    return this.http.get< Location >(`${this.url}site/locationlist`).pipe(take(1));
  }

  // Get any items from generic service getter function

  get Dimensions() {
    return this.http.get(`${this.url}site/get?service=Dimensions`).pipe(take(1));
  }

  get Departments() {
    return this.http.get(`${this.url}site/departments`).pipe(take(1));
  }

  get Projects() {
    return this.http.get(`${this.url}site/projects`).pipe(take(1));
  }


  // Post Lines Data

  postLine(line: Stockissueline) {
    return this.http.post(`${this.url}site/addline`, JSON.stringify(line) );
  }

  // Update Line

  updateRequisitionLine(line: Stockissueline) {
    return this.http.post< Stockissueline >(`${this.url}site/updateissueline`, JSON.stringify(line) );
  }



  // Fetch Line to Update
  getLine(Key: string){
    return this.http.get< Stockissueline >(`${this.url}site/stock-issue-line?Key=${Key}`);
  }

  // Post Requisition Header

  postRequisition(requisition: Stockissue) {
    return this.http.post< Stockissue >(`${this.url}site/update-requisition`, JSON.stringify(requisition) );
  }

  // Format date utility
  formatDate(datestring: string) {
    // Format Date to YYYY-MM-DD
    const recDate = new Date(datestring);
    const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
    const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
    return  `${recDate.getFullYear()}-${month}-${day}`;
  }

  acknowledgeStockIssue(No){
    return this.http.get(`${this.url}site/acknowledge-stock-issue?No=${No}`);
  }

  postDocument(No){
    return this.http.get(`${this.url}site/acknowledge-stock-issue?No=${No}`);
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
