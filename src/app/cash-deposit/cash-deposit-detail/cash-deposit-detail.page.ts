import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cashdeposit } from 'src/app/models/cashdeposit.model';
import { UtilityService } from 'src/app/utility.service';
import { CashDepositService } from '../cash-deposit.service';

@Component({
  selector: 'app-cash-deposit-detail',
  templateUrl: './cash-deposit-detail.page.html',
  styleUrls: ['./cash-deposit-detail.page.scss'],
})
export class CashDepositDetailPage implements OnInit {

  depositSub: Subscription;
  cashDeposit: Cashdeposit;
  Key: string;
  constructor(
    private depositSvc: CashDepositService,
    private activatedRoute: ActivatedRoute,
    private utilitySvc: UtilityService
    ) { }

  ngOnInit() {
    
    this.Key = this.activatedRoute.snapshot.paramMap.get('Key');

    if(this.Key) {
      this.FetchCard();
    }
  }

  FetchCard() {
    
    this.depositSub = this.depositSvc.getCard(this.Key)
    .subscribe(result => {
     
      this.cashDeposit = result;
      
    }, error => {
      console.log(error.error);
      this.utilitySvc.showAlert(error.error.message);
    });
  }


}
