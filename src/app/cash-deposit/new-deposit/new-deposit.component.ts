import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cashdeposit } from 'src/app/models/cashdeposit.model';
import { Cashdepositline } from 'src/app/models/cashdepositline.model';
import { UtilityService } from 'src/app/utility.service';
import { CashDepositService } from '../cash-deposit.service';

@Component({
  selector: 'app-new-deposit',
  templateUrl: './new-deposit.component.html',
  styleUrls: ['./new-deposit.component.scss'],
})
export class NewDepositComponent implements OnInit {

  @Input() cashDepo: Cashdeposit;
  updateSub: Subscription;
  cashDeposit = new Cashdeposit();
  updateLineSub: Subscription;
  line = new Cashdepositline();

  constructor(
    private depositSvc: CashDepositService,
    private utilitySvc: UtilityService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    // console.log(`Cash Deposit State passed to component:`);
    // console.table(this.cashDepo);
    Object.assign(this.cashDeposit, this.cashDepo);
  }

  onUpdateDocument() {
    this.updateSub = this.depositSvc.updateDeposit(this.cashDeposit)
    .subscribe(res => {
      if(typeof res === 'string')
      {
        this.utilitySvc.showAlert(res);
        return false;
      } 
      else if(typeof res === 'object') {
        Object.assign(this.cashDeposit, res);
        this.utilitySvc.showToast('Cash Deposit Card Updated Successfully.');
      }
    },error => {
      this.utilitySvc.showAlert(error);
    });
  }

  onUpdateLine() {
    this.updateLineSub = this.depositSvc.updateLine(this.line)
    .subscribe(res => {
      if(typeof res === 'string')
      {
        this.utilitySvc.showAlert(res);
        return false;
      } 
      else if(typeof res === 'object') {
        Object.assign(this.cashDeposit, res);
        this.utilitySvc.showToast('Cash Deposit Line Updated Successfully.');
      }
    },error => {
      this.utilitySvc.showAlert(error);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
