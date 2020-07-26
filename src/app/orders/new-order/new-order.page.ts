import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.popoverCtrl.dismiss();
  }

}
