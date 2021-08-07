import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requisition } from './requisition.model';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Unit } from '../models/unit.model';
import { Requisitionline } from '../models/requisitionline.model';
import { Location } from '../models/location.model';
import { Stockissue } from '../models/stockissue.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {
  url = environment.url;
  private _refresh$ = new Subject<void>();


  constructor(private http: HttpClient) { }

  // Synthetic Getter for our refresh observerble

  get refresh$() {
    return this._refresh$;
  }

  getRequisitions(userID) {
    return this.http.get< Requisition[] >(`${this.url}site/requisitions?userid=${userID}`).pipe(take(1));
  }

  get releasedrequisitions() {
    return this.http.get< Stockissue[] >(`${this.url}site/releasedrequisitions`).pipe(take(1));
  }

  // Retrieve Requisition Card / Details
  requisitioncard(id: string) {
    return this.http.get<[]>(`${this.url}site/requisitioncard/?id=${id}`);
  }

  // Create New Requisition

  createRequisition(userID: string) {
    console.log('creator is:'+userID);
    return this.http.get< Requisition >(`${this.url}site/create-requisition?userid=${ userID }`);
  }

  // get Units of Measure

  getunits(itemNo: string) {
    return this.http.get< Unit[] >(`${this.url}site/unitmeasure?itemNo=${itemNo}`).pipe(take(1));
  }

  // Get Locations List

  getLocations() {
    return this.http.get< Location[] >(`${this.url}site/locationlist`).pipe(take(1));
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

  postLine(line: Requisitionline) {
    return this.http.post(`${this.url}site/requisition-lines`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._refresh$.next();
      } )
    );
  }

  // Update Line

  updateRequisitionLine(line: Requisitionline) {
    return this.http.post< Requisitionline >(`${this.url}site/updaterequisitionline`, JSON.stringify(line) )
    .pipe(
      tap( () => {
        this._refresh$.next();
      } )
    );
  }

  // Fetch Line to Update
  getLine(Key: string){
    return this.http.get< Requisitionline >(`${this.url}site/requisition-lines?Key=${Key}`);
  }

  // Post Requisition Header

  postRequisition(requisition: Requisition) {
    return this.http.post< Requisition >(`${this.url}site/update-requisition`, JSON.stringify(requisition) );
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
