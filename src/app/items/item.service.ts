import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Itembalance } from '../models/itembalance.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url = environment.url;
  constructor( private http: HttpClient ) { }

  get items() {
    return this.http.get<[]>(`${this.url}site/items`).pipe(take(1));
  }

  itemcard(id: string){
    return this.http.get<[]>(`${this.url}site/itemcard/?id=${id}`);
  }

  itemBalance(No: string){
    return this.http.get<Itembalance>(`${this.url}site/itemavailabilitybylocation/?No=${No}`);
  }

}
