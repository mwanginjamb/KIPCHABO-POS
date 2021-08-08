import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-popover',
  templateUrl: './sales-popover.component.html',
  styleUrls: ['./sales-popover.component.scss'],
})
export class SalesPopoverComponent implements OnInit {

  @Input() No: number;
  @Input() Card: Postedsalesinvoice;
  constructor( private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async showBluetoothDevices(){
    
  }

  showDaily(){
    return this.router.navigate(['./postedsales/dailyreport']);
  }

  showMonthly(){
    return this.router.navigate(['./postedsales/monthlyreport']);
  }

}
