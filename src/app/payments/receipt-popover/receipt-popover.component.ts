import { Component, OnInit, Input } from '@angular/core';
import { Receipt } from 'src/app/models/receipt.model';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BluetoothComponent } from '../bluetooth/bluetooth.component';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { UtilityService } from 'src/app/utility.service';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-receipt-popover',
  templateUrl: './receipt-popover.component.html',
  styleUrls: ['./receipt-popover.component.scss'],
})
export class ReceiptPopoverComponent implements OnInit {

  @Input() No;
  @Input() Card: Receipt;

  myString: string;

  constructor( private modalCtrl: ModalController, private router: Router, private printer: Printer, private utilitySvc: UtilityService, private paymentService: PaymentsService) { }

  ngOnInit() {
    this.generateReceiptPrintable();
  }


  localPrint() {
    this.printer.isAvailable().then(() => {
      this.utilitySvc.showToast(`Printer Found and Getting Ready to Print.`);
    }, (err) => {
      this.utilitySvc.showAlert(err);
    });

    let options: PrintOptions = {
        name: 'Receipt',
        duplex: true,
        orientation: 'portrait',
        monochrome: true
    }

    this.printer.print(this.myString, options).then(() => {
      this.utilitySvc.showToast(`Receipt Printed Successfully.`);
    }, (err) => {
      this.utilitySvc.showAlert(err);
    });
  }

  generateReceiptPrintable(){

    this.myString =   `
    Kipchabo Tea Factory Receipt.

    Customer: ${this.Card?.Customer_Name}


    Item | Qty  | Total Amount  

    `;

    // Filter Lines to Print

    const LinestoPrint = this.Card.POS_Receipt_Lines.POS_Receipt_Lines.filter( ln => ln.Total_Amount > 0);

    LinestoPrint.forEach(line => {
      this.myString += `

    ${line.Description}  | ${line.Price} | ${line.Total_Amount}  \r\n` ;

    });

    const Total = this.paymentService.getTotals(this.Card.POS_Receipt_Lines.POS_Receipt_Lines, 'Total_Amount');
    const VAT = this.Card?.Total_Amount * 0.16;

    this.myString += `

          Total Amount: ${Total}
          VAT: ${VAT}
                   `;
  }

  async showBluetoothDevices(){
    return await this.modalCtrl.create(
      {
        component: BluetoothComponent,
        componentProps: { No: this.No, receiptCard: this.Card, Printable: 'Receipt' },
      }
    ).then( modalEl => {
      modalEl.present();
    });
  }

  showDaily(){
    return this.router.navigate(['./payments/daily-report']);
  }

  showMonthly(){
    return this.router.navigate(['./payments/monthly-report']);
  }

}
