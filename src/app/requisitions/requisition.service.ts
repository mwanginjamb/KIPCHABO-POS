import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requisition } from './requisition.model';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Unit } from '../models/unit.model';
import { Requisitionline } from '../models/requisitionline.model';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  get requisitions() {
    return this.http.get< Requisition[] >(`${this.url}site/requisitions`).pipe(take(1));
  }

  get releasedrequisitions() {
    return this.http.get< Requisition[] >(`${this.url}site/releasedrequisitions`).pipe(take(1));
  }

  // Retrieve Requisition Card / Details

  requisitioncard(id: string) {
    return this.http.get<[]>(`${this.url}site/requisitioncard/?id=${id}`);
  }

  // get Units of Measure

  getunits(itemNo: string) {
    return this.http.get< Unit[] >(`${this.url}site/unitmeasure?itemNo=${itemNo}`).pipe(take(1));
  }

  // Post Lines Data

  postLine(line: Requisitionline) {
    return this.http.post< Requisitionline >(`${this.url}site/addline`, JSON.stringify(line) );
  }


}
