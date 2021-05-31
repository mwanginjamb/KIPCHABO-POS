import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  loading: HTMLIonLoadingElement;

  constructor(
    private stockService: StockdetailService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.presentLoading();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.cardSub = this.stockService.requisitioncard(this.id)
    .pipe(
      finalize(async() => {
        await this.loading.dismiss();
      })
    )
    .subscribe( cardInfo => {
      this.card = cardInfo;
      console.log(this.card);
    });
  }

  refresh(event){
    this.cardSub = this.stockService.requisitioncard(this.id).subscribe( result => {
      this.card = result;
      if (event){
        event.target.complete();
      }
    });
  }

  onUpdateLine(Key: string) {

    this.modalCtrl.create({
      component: LinesComponent,
      componentProps: { Key }
    })
    .then( modalEl => {
      modalEl.present();
    } );
  }

  async presentLoading(message?: string) {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots',
      animated: true,
      message: (message)? message:'Loading Data...'
    });
  
    await this.loading.present();
  }

}
