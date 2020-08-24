import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Itembalance } from '../models/itembalance.model';
import { Itemledgerentry } from '../models/itemledgerentry.model';
import { Item } from './item.model';
import { Location } from '../models/location.model';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url = environment.url;
  constructor( private http: HttpClient, private toastCtrl: ToastController ) { }

  get items() {
    return this.http.get<[]>(`${this.url}site/items`).pipe(take(1));
  }

  itemcard(id: string){
    return this.http.get<[]>(`${this.url}site/itemcard/?id=${id}`);
  }

  itemBalance(No: string){
    return this.http.get<Itemledgerentry[]>(`${this.url}site/itemavailabilitybylocation/?No=${No}`);
  }

  itemBalanceByLocation(No: string, LocationCode: string){
    return this.http.get<Itemledgerentry[]>(`${this.url}site/itemavailabilitybylocation/?No=${No}&Location=${LocationCode}`).pipe(take(1));
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

  // Get Locations List
  getLocations() {
    return this.http.get< Location >(`${this.url}site/locationlist`).pipe(take(1));
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
