import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Farmer } from "../models/farmer.model";

@Injectable({
  providedIn: "root",
})
export class FarmerService {
  url = environment.url;
  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

  get Farmers() {
    return this.http
      .get<Farmer[]>(`${this.url}site/get?service=FarmerList`)
      .pipe(take(1));
  }

   Shades(No: string) {
    return this.http.get(`${this.url}site/shades?No=${No}`).pipe(take(1));
  }

  get Routes() {
    return this.http.get(`${this.url}site/get?service=Routes`).pipe(take(1));
  }

  createFarmer(farmer: Farmer) {

    return this.http.post<Farmer>(
      `${this.url}site/add-farmer`,
      JSON.stringify(farmer)
    );
  }

  updateFarmer(farmer: Farmer) {
    return this.http.post<Farmer>(
      `${this.url}site/updatefarmer`,
      JSON.stringify(farmer)
    );
  }

  farmerCard(id: string) {
    return this.http.get<Farmer>(`${this.url}site/farmer-card/?id=${id}`);
  }

  // Format date utility

  formatDate(datestring: string) {
    // Format Date to YYYY-MM-DD
    const recDate = new Date(datestring);
    const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
    const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
    return  `${recDate.getFullYear()}-${month}-${day}`;
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
