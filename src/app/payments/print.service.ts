import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor( public btSerial: BluetoothSerial, private toastCtrl: ToastController) {
    btSerial.enable();
   }

  searchBluetoothPrinter(){
    return this.btSerial.list();
  }

  connectToBluetoothPrinter(macAddress){
    return this.btSerial.connect(macAddress);
  }

  disconnectBluetoothPrinter(){
    return this.btSerial.disconnect();
  }

  success = (data) => {
    this.showToast(`Printing Successfull !`);
  }

  fail = (error) => {
    alert(error);
  }

  async sendToBluetoothPrinter(dataString){
    // Write to bt printer
    await this.btSerial.write(dataString).then(this.success, this.fail);
    // Disconnect the Printer.
    this.disconnectBluetoothPrinter();
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
