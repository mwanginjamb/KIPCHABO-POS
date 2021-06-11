import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) { }

  formatDate(datestring: string) {
    // Format Date to YYYY-MM-DD
    const recDate = new Date(datestring);
    const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
    const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
    return  `${recDate.getFullYear()}-${month}-${day}`;
  }

  async showToast(text){
    let toastEl =  this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'top'
    });

    (await toastEl).present();

  }

  async showAlert(text) {
    const alertEl = await this.alertCtrl.create({
      header: 'Operation Error',
      message: 'Message : ' + text,
      buttons: [{ text: 'Okay' }]
    });

    await alertEl.present(); 
  }

  async presentLoading(message?: string) {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      animated: true,
      message: (message)? message:'Loading Data...'
    });
  
    await loading.present();
  }
}
