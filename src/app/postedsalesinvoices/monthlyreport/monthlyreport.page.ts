import { Component, OnInit, OnDestroy } from '@angular/core';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { Subscription } from 'rxjs';
import { SalesService } from '../sales.service';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.page.html',
  styleUrls: ['./monthlyreport.page.scss'],
})
export class MonthlyreportPage implements OnInit, OnDestroy {


  FilterRange = { startDate: new Date(), endDate : new Date() };
  SalesSub: Subscription;
  sales: Postedsalesinvoice[];
  Total = 0;
  success = false;
  user: any;

  constructor(
     private salesService: SalesService, 
     private popOver: PopoverController,
     private authService: AuthService
     ) { }

  ngOnInit() {
    this.popOver.dismiss();
  }

  ionViewWillEnter() {
    this.setUser();
  }
  
  ionViewDidEnter() {
    this.setUser();
  }

  async setUser() {
    this.user = await this.authService.getUser();
  }

  FilterSalebyRange(){
    const startDate = this.salesService.formatDate(this.FilterRange.startDate);
    const endDate = this.salesService.formatDate(this.FilterRange.endDate);
    if (Date.parse(startDate) &&  Date.parse(endDate)){
      this.SalesSub = this.salesService.FilterSalesbyRange(startDate, endDate, this.user?.User_ID).subscribe( res => {
        if (typeof res === 'string'){
          this.salesService.showToast(res);
          this.sales = [];
          this.Total = 0;
          this.success = false ;
          return;
        }

        this.sales = res;
        this.Total = this.getTotals(this.sales);
        this.success = (typeof res === 'object') ? true : false;
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
         if ( property === 'Amount' && !isNaN(+obj[property]) ){
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
