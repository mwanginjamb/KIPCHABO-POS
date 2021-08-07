import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalesService } from './sales.service';
import { Postedsalesinvoice } from '../models/postedsalesinvoice.model';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-postedsalesinvoices',
  templateUrl: './postedsalesinvoices.page.html',
  styleUrls: ['./postedsalesinvoices.page.scss'],
})


export class PostedsalesinvoicesPage implements OnInit, OnDestroy {
  FilterRange = { startDate: new Date(), endDate : new Date() };
  isLoading = true;
  SalesSub: Subscription;
  sales: Postedsalesinvoice[];
  searchTerm: string = null;
  Total = 0;



  constructor(
    private salesService: SalesService,
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    this.FetchSales();
  }

  ionViewWillEnter() {
    // this.FetchSales();
  }

  ionViewDidEnter() {
    // this.FetchSales();
  }

  FetchSales() {
    this.SalesSub = this.salesService.Sales
    .pipe(
      finalize( () => {
        this.isLoading = false;
      })
    )
    .subscribe(result => {
      this.sales = this.sort([...result]);  
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
        if ( sales.Customer_Name && sales.Customer_Name.length > 1 ){
          return ( sales.Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.FetchSales();
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

  sort(dataArray: Postedsalesinvoice[]){
    return dataArray.sort((a,b) => (b.No > a.No) ? 1: -1);
  }

  onReturn(Key: string, sliding: IonItemSliding ){
    sliding.close();
    //Create return request, send postedsales invoice key for retrieval of the rcord
    this.router.navigate(['../return/create/',Key]);
  }

  ngOnDestroy(){
    if (this.SalesSub){
      this.SalesSub.unsubscribe();
    }
  }

}
