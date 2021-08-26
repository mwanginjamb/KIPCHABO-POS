import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
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
  line: Cashdepositline = new Cashdepositline();
  lineSub: Subscription;

  constructor(
    private depositSvc: CashDepositService,
    private utilitySvc: UtilityService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    // console.log(`Cash Deposit State passed to component:`);
    // console.table(this.cashDepo);
    Object.assign(this.cashDeposit, this.cashDepo);

    // check if lines have changed and update card accordingly

    this.depositSvc.lineRefresh$.subscribe(res => {
      console.log(`Updated Line.......`);
      console.log(res);
    });

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

  onUpdateLine(Key: string) {
    this.lineSub = this.depositSvc.getLine(Key).subscribe(line => {
      if(line) {
        this.line = line;
        this.line.Select = !line?.Select;
        this.updateLine(line);
      }
    });
  }

  updateLine(line: Cashdepositline) {
    this.updateLineSub = this.depositSvc.updateLine(line)
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
