import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { Invoice } from 'src/app/models/invoice.model';
import { PaymentsService } from '../payments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  No = null;
  cardSub: Subscription;
  card: Receipt = new Invoice();
  banks: [];
  bankSub: Subscription;

  constructor(
    private paymentService: PaymentsService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit( ) {
    this.No = this.activatedRoute.snapshot.paramMap.get('id');
    this.FetchCard();
    this.FetchBanks();
  }

  FetchCard(){
    this.cardSub = this.paymentService.getPayment(this.No).subscribe( result => {
      this.card = result;
      console.log(result);
    });
  }

  FetchBanks(){
    this.bankSub = this.paymentService.Banks.subscribe( result => {
      this.banks = result;
    });
  }

  selectInvoice(CustomerNo: string, Line: number, ReceiptNo: string){
    // console.log(`Cust: ${CustomerNo} Line: ${Line} and Rec: ${ReceiptNo}`); return;
    this.paymentService.selectLine(CustomerNo, Line, ReceiptNo).subscribe(res => {
      // console.log(res);
      this.paymentService.showToast(' Invoice Line Updated Successfully.');
    }, error => {
      alert(error);
    });
  }

  post(ReceiptNo){
    console.log(ReceiptNo);
    this.paymentService.postReceipt(ReceiptNo).subscribe(res => {
      this.paymentService.showToast(`Document Posted Successfully.`);
    }, error => {
      alert(error);
    });
  }

  setAmountToReceipt(CustomerNo: string, Line: number, ReceiptNo: string, $event){
    this.paymentService.setAmountToReceipt(CustomerNo, Line, ReceiptNo, $event.target.value).subscribe(res => {
      this.paymentService.showToast(' Invoice Line Updated Successfully.');
    }, error => {
      alert(error);
    });
  }

}
