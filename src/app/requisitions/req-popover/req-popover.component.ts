import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-req-popover',
  templateUrl: './req-popover.component.html',
  styleUrls: ['./req-popover.component.scss'],
})
export class ReqPopoverComponent implements OnInit {

  constructor( public popoverCtrl: PopoverController) { }

  ngOnInit() {}


  close() {
    this.popoverCtrl.dismiss();
  }

}
