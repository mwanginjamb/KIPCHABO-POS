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
  FilterRange = { startDate: new Date(), endDate : new Date() };
  isLoading = false;
  SalesSub: Subscription;
  sales: Postedsalesinvoice[];
  searchTerm: string = null;
  Total = 0;



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
    const searchItems = [...this.sales];
    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.sales = searchItems.filter((sales) => {
        if ( sales.Sell_to_Customer_Name && sales.Sell_to_Customer_Name.length > 1 ){
          return ( sales.Sell_to_Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.FetchSales();
    }
  }

  FilterSalebyDate($event){
    const startDate = this.salesService.formatDate($event.target.value);
    if (Date.parse(startDate) ){
      this.salesService.FilterSales(startDate).subscribe( res => {
        this.sales = res;
        this.Total = this.getTotals(this.sales);
      });

    }else{
      return 'No Date Supplied';
    }
  }

  FilterSalebyRange(){
    const startDate = this.salesService.formatDate(this.FilterRange.startDate);
    const endDate = this.salesService.formatDate(this.FilterRange.endDate);
    if (Date.parse(startDate) &&  Date.parse(endDate)){
      this.salesService.FilterSalesbyRange(startDate, endDate).subscribe( res => {
        this.sales = res;
        this.Total = this.getTotals(this.sales);
      });
    }else{
      return 'No Date Supplied';
    }
  }

  getTotals(elements){
    let sum = 0;
    elements.forEach(obj => {
      console.log(obj);
      for (const property in obj){
         if( property === 'Amount_Including_VAT' && !isNaN(+obj[property]) ){
          console.log(+obj[property]);
          sum += +obj[property];
        }
      }
    });
    return sum;
  }

  ngOnDestroy(){
    if (this.SalesSub){
      this.SalesSub.unsubscribe();
    }
  }

}
