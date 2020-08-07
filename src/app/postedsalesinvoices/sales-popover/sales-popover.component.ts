import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothComponent } from 'src/app/payments/bluetooth/bluetooth.component';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';

@Component({
  selector: 'app-sales-popover',
  templateUrl: './sales-popover.component.html',
  styleUrls: ['./sales-popover.component.scss'],
})
export class SalesPopoverComponent implements OnInit {

  @Input() No: number;
  @Input() Card: Postedsalesinvoice;
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showBluetoothDevices(){
    return await this.modalCtrl.create(
      {
        component: BluetoothComponent,
        componentProps: { No: this.No, Card: this.Card },
      }
    ).then( modalEl => {
      modalEl.present();
    });
  }

}
