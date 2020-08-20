import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { PaymentsService } from '../payments.service';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.page.html',
  styleUrls: ['./daily-report.page.scss'],
})
export class DailyReportPage implements OnInit, OnDestroy {

  receiptSub: Subscription;
  success = false;
  Total = 0;
  receipts: Receipt[];

  constructor( private paymentService: PaymentsService) { }

  ngOnInit() {
  }

  FilterReceiptsbyDate($event){
    const startDate = this.paymentService.formatDate($event.target.value);
    if (Date.parse(startDate) ){
      this.receiptSub = this.paymentService.FilterReceipts(startDate).subscribe( res => {
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
      this.receipts = [];
      this.success = false;
      // return 'No Date Supplied';
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
