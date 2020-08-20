import { Component, OnInit, Input } from '@angular/core';
import { Receipt } from 'src/app/models/receipt.model';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BluetoothComponent } from '../bluetooth/bluetooth.component';

@Component({
  selector: 'app-receipt-popover',
  templateUrl: './receipt-popover.component.html',
  styleUrls: ['./receipt-popover.component.scss'],
})
export class ReceiptPopoverComponent implements OnInit {

  @Input() No;
  @Input() Card: Receipt;

  constructor( private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {}

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
