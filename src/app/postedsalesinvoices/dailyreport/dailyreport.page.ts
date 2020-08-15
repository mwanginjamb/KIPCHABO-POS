import { Component, OnInit, OnDestroy } from '@angular/core';
import { Postedsalesinvoice } from 'src/app/models/postedsalesinvoice.model';
import { SalesService } from '../sales.service';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.page.html',
  styleUrls: ['./dailyreport.page.scss'],
})
export class DailyreportPage implements OnInit, OnDestroy {

  sales: Postedsalesinvoice[];
  Total = 0;
  salesSub: Subscription;
  success = false;

  constructor(private salesService: SalesService, private popOver: PopoverController) { }

  ngOnInit() {
    this.popOver.dismiss();
  }

  FilterSalebyDate($event){
    const startDate = this.salesService.formatDate($event.target.value);
    if (Date.parse(startDate) ){
      this.salesSub = this.salesService.FilterSales(startDate).subscribe( res => {

        if (typeof res === 'string'){
          this.salesService.showToast(res);
          this.sales = [];
          this.Total = 0;
          this.success = false;
          return;
        }

        this.sales = res;
        this.Total = this.getTotals(this.sales);
        this.success = (typeof res === 'object') ? true : false;
      });

    }else{
      this.sales = [];
      this.success = false;
      // return 'No Date Supplied';
    }
  }

  getTotals(elements){
    let sum = 0;
    elements.forEach(obj => {
      // console.log(obj);
      for (const property in obj){
         if ( property === 'Amount_Including_VAT' && !isNaN(+obj[property]) ){
          console.log(+obj[property]);
          sum += +obj[property];
        }
      }
    });
    return sum;
  }

  ngOnDestroy(){
    if (this.salesSub){
      this.salesSub.unsubscribe();
    }
  }

}
