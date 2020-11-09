import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { ModalController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { PrintService } from '../print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { CurrencyPipe, getLocaleCurrencyCode } from '@angular/common';
import { Receipt } from 'src/app/models/receipt.model';
import { PaymentsService } from '../payments.service';


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
  @Input() Card: Postedsalesinvoice ;
  @Input() receiptCard: Receipt;
  @Input() Printable;

  myString: string = null;

  constructor(
     private modalCtrl: ModalController,
     private printService: PrintService,
     private bluetoothSerial: BluetoothSerial,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController,
     private popOverCtrl: PopoverController,
     private paymentService: PaymentsService
     ) {
    this.bluetoothSerial.enable();
   }

  ngOnInit() {
    this.popOverCtrl.dismiss();
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
     if (this.Printable === 'Invoice'){
      this.generatePostedSalesInvoicePrintable();
     }else if (this.Printable === 'Receipt'){
      this.generateReceiptPrintable();
     }
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

  generatePostedSalesInvoicePrintable(){
    this.myString =   `
    Kipchabo Tea Factory Ltd - Invoice.

    Customer: ${this.Card?.Sell_to_Customer_Name}

    Sale Date: ${this.Card.Posting_Date}

    Invoice No: ${this.Card.No}

    Item | Quantity  | Unit Price (Ksh) | Total  (Incl. VAT)

    `;

    /* this.Card.SalesInvLines.Posted_Sales_Invoice_Line.forEach(line => {
      this.myString += `
    ${line.Description}  | ${line.Quantity} | ${line.Unit_Price} | ${line.Line_Amount } \r\n` ;
    });*/

    // Filter Lines to print
    const LinestoPrint = this.Card.SalesInvLines.Posted_Sales_Invoice_Line.filter(ln => ln.Line_Amount > 0);

    LinestoPrint.forEach(line => {
      this.myString += `
    ${line.Description}  | ${line.Quantity} | ${line.Unit_Price} | ${line.Line_Amount } \r\n` ;
    });


    const VAT = this.Card?.Amount_Including_VAT * 0.16;

    this.myString += `

     Total Amount: ${this.Card?.Amount_Including_VAT}

     VAT: ${VAT}
     `;

  }

  generateReceiptPrintable(){

    this.myString =   `
    Kipchabo Tea Factory Receipt.

    Customer: ${this.receiptCard?.Customer_Name}


    Invoice No | Amount  | Amount to receipt 

    `;

    // Filter Lines to Print

    const LinestoPrint = this.receiptCard.Cash_Receipt_Line.Cash_Receipt_Line.filter( ln => ln.Amount_To_Receipt > 0);

    LinestoPrint.forEach(line => {
      this.myString += `

    ${line.Invoice_No}  | ${line.Amount} | ${line.Amount_To_Receipt}  \r\n` ;

    });

    const Total = this.paymentService.getTotals(this.receiptCard.Cash_Receipt_Line.Cash_Receipt_Line, 'Amount_To_Receipt');

    this.myString += `

          Total Amount: ${Total}

                   `;
  }

}
