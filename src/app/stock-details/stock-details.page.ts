import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Stockissue } from '../models/stockissue.model';
import { LinesComponent } from './lines/lines.component';
import { StockdetailService } from './stockdetail.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.page.html',
  styleUrls: ['./stock-details.page.scss'],
})
export class StockDetailsPage implements OnInit {

  card: Stockissue;
  cardSub: Subscription;
  id: string;

  constructor(
    private stockService: StockdetailService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.cardSub = this.stockService.requisitioncard(this.id).subscribe( cardInfo => {
      this.card = cardInfo;
      console.log(this.card);
    });
  }

  onUpdateLine(Item_No: string, Stock_Issue_No: string) {

    this.modalCtrl.create({
      component: LinesComponent,
      componentProps: { Item_No, Stock_Issue_No }
    })
    .then( modalEl => {
      modalEl.present();
    } );
  }

}
