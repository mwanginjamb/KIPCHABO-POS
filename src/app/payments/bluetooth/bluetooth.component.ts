import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { PrintService } from '../print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';


@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss'],
})
export class BluetoothComponent implements OnInit {
  btDevices: any = [];
  selectedPrinter: any;
  scanning: boolean;
  pairedDevices: any = null;
  unpairedDevices: any = null;

  constructor(
     private modalCtrl: ModalController,
     private printService: PrintService,
     private bluetoothSerial: BluetoothSerial,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController
     ) {
    this.bluetoothSerial.enable();
   }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async listPrinters(){
    this.scanning = true;
    return await this.printService.searchBluetoothPrinter().then(res => {
       this.btDevices = res;
       this.scanning = false;
     }, error => {
       console.log(error);
     });
   }

   success = (data) => {
     this.deviceConnected();
     this.print();
   }

   fail = (error) => {
     alert(error);
   }

  async selectPrinter(macAddress){
   const alert = await this.alertCtrl.create({
     header: 'Connect',
     message: 'Do you want to connect with selected device ?',
     buttons: [
       {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.showToast('Connection Intent Cancelled.');
        }
       },
       {
        text: 'Connect',
        handler: () => {
          this.selectPrinter = macAddress;
          this.bluetoothSerial.connect(macAddress).subscribe(this.success, this.fail);
        }
       }
     ]
   });
   await alert.present();
  }

  deviceConnected(){
    this.bluetoothSerial.isConnected()
    .then(success => {
      alert(`Connected Successfully. `);
    }, error => {
      alert('error' + JSON.stringify('error'));
    });
  }

  print(){
    const message = `Kipchabo Tea Factory
                    1. Tea 50g : 4,500
                    2. Tea 100g :3,600
                    3. Tea 1000g : 5,700`;

    this.printService.sendToBluetoothPrinter(message);
  }

  async showToast(text){
    return await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    }).then( toastEl => {
      toastEl.present();
    });
  }

}
