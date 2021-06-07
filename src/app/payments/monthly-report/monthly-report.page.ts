import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
})
export class MonthlyReportPage implements OnInit, OnDestroy {

  FilterRange = { startDate: new Date(), endDate : new Date() };
  receiptSub: Subscription;
  success = false;
  Total = 0;
  receipts: Receipt[];
  user: any;


  constructor( private paymentService: PaymentsService, private authService: AuthService) { }

  ngOnInit() {
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
    const startDate = this.paymentService.formatDate(this.FilterRange.startDate);
    const endDate = this.paymentService.formatDate(this.FilterRange.endDate);
    if (Date.parse(startDate) &&  Date.parse(endDate)){
      this.receiptSub = this.paymentService.FilterReceiptsbyRange(startDate, endDate, this.user?.User_ID).subscribe( res => {
      // alert(res);
        if (typeof res === 'string'){
          this.paymentService.showToast(res);
          this.receipts = [];
          this.Total = 0;
          this.success = false;
          return;
        }
        this.receipts = res;
        this.Total = this.getTotals(this.receipts, 'Total_Amount');
        this.success = (typeof res === 'object') ? true : false;
      });
    }else{
      return 'No Date Supplied';
    }
  }

  


  getTotals(elements, SubjectCol){
    if (typeof elements === 'object'){
      return this.paymentService.getTotals(elements, SubjectCol);
    }else{
      return 0;
    }
  }

  ngOnDestroy(){
    if (this.receiptSub){
      this.receiptSub.unsubscribe();
    }
  }

}
