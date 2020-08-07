import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { SalesService } from '../sales.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, ModalController } from '@ionic/angular';
import { SalesPopoverComponent } from '../sales-popover/sales-popover.component';
import { BluetoothComponent } from 'src/app/payments/bluetooth/bluetooth.component';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.page.html',
  styleUrls: ['./sale-detail.page.scss'],
})
export class SaleDetailPage implements OnInit, OnDestroy {

  No = null;
  cardSub: Subscription;
  card: Postedsalesinvoice = new Postedsalesinvoice();


  constructor(
    private salesService: SalesService,
    private  activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.No = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.No);
    this.FetchCard();
  }

  FetchCard(){
    this.cardSub = this.salesService.getSale(this.No).subscribe(result => {
      this.card = result;
      console.log(this.card);
    });
  }

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: SalesPopoverComponent,
      componentProps: { No: this.No, Card: this.card },
      event
    }).then(pop => {
      pop.present();
    });
  }


  ngOnDestroy(){
    if (this.cardSub){
      this.cardSub.unsubscribe();
    }
  }

}
