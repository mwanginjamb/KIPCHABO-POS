import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalesService } from './sales.service';
import { Postedsalesinvoice } from '../models/postedsalesinvoice.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-postedsalesinvoices',
  templateUrl: './postedsalesinvoices.page.html',
  styleUrls: ['./postedsalesinvoices.page.scss'],
})
export class PostedsalesinvoicesPage implements OnInit, OnDestroy {

  isLoading = false;
  SalesSub: Subscription;
  sales: Postedsalesinvoice[];
  searchTerm: string = null;

  constructor(
    private salesService: SalesService,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.FetchSales();
  }

  FetchSales() {
    this.SalesSub = this.salesService.Sales.subscribe(result => {
      console.log(result);
      this.sales = [...result];
      this.isLoading = false;
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }

  searchSale($event){

  }

  ngOnDestroy(){
    if (this.SalesSub){
      this.SalesSub.unsubscribe();
    }
  }

}
