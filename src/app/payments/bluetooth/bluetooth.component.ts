import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { PrintService } from '../print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { CurrencyPipe, getLocaleCurrencyCode } from '@angular/common';


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

  @Input() No;
  @Input() Card: Postedsalesinvoice;

  myString: string = null;

  constructor(
     private modalCtrl: ModalController,
     private printService: PrintService,
     private bluetoothSerial: BluetoothSerial,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController,
     private popOverCtrl: PopoverController
     ) {
    this.bluetoothSerial.enable();
   }

  ngOnInit() {
    this.popOverCtrl.dismiss();
    this.myString =   `
    Kipchabo Tea Factory.

    Customer: ${this.Card?.Sell_to_Customer_Name}


    Item | Quantity  | Unit Price (Ksh) | Total  (Incl. VAT)

    `;

    this.Card.SalesInvLines.Posted_Sales_Invoice_Line.forEach(line => {
      this.myString += `
    ${line.Description}  | ${line.Quantity} | ${line.Unit_Price} | ${line.Line_Amount } \r\n` ;
    });

    this.myString += `                  Total Amount: ${this.Card?.Amount_Including_VAT}`;
    // console.log(`DOC NO TO PRINT`);
    console.log(this.myString);
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
     this.print(this.myString);
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

  print(stringtoPrint){
    this.printService.sendToBluetoothPrinter(stringtoPrint);
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
