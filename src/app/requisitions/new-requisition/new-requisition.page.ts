import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-new-requisition',
  templateUrl: './new-requisition.page.html',
  styleUrls: ['./new-requisition.page.scss'],
})
export class NewRequisitionPage implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.popoverCtrl.dismiss();
  }

}
