import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { Invoice } from 'src/app/models/invoice.model';
import { PaymentsService } from '../payments.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, AlertController, ModalController } from '@ionic/angular';
import { ReceiptPopoverComponent } from '../receipt-popover/receipt-popover.component';
import { NewCashLineComponent } from '../new-cash-line/new-cash-line.component';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {

  No = null;
  cardSub: Subscription;
  card: Receipt;
  banks: [];
  bankSub: Subscription;

  constructor(
    private paymentService: PaymentsService,
    private activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit( ) {
    this.No = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('RECEIPT NO');
    console.log(this.No);
    this.FetchCard();
    this.FetchBanks();
  }


  FetchCard(){
    this.cardSub = this.paymentService.getPayment(this.No).subscribe( result => {
      this.card = result;
      console.log(this.card);
    });
  }

  refresh(event){
    this.cardSub = this.paymentService.getPayment(this.No).subscribe( result => {
      this.card = result;
      if (event){
        event.target.complete();
      }
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
      if (typeof res === 'string'){ // a string response represents a Nav Error, so we display it.
        this.alertCtrl.create({
          header: 'Service Warning!',
          message: res,
          buttons: [{ text: 'Okay' }]
        }).then( alertEl => {
          alertEl.present();
        });
      }else{
        this.paymentService.showToast(`Document Posted Successfully.`);
      }

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

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: ReceiptPopoverComponent,
      componentProps: { No: this.No, Card: this.card },
      event
    }).then(pop => {
      pop.present();
    });
  }

  onAddLine(POS_Receipt_No: string)
  {
    this,this.modalCtrl.create(
      {
        component: NewCashLineComponent,
        componentProps: { receiptNo: POS_Receipt_No }
      }
    )
    .then( modalEl => {
      modalEl.present();
    });
  }

  onUpdateLine(Key: string) {
    console.log(Key);
    this.modalCtrl.create({
      component: NewCashLineComponent,
      componentProps: { Key }
    })
    .then( modalEl => {
      modalEl.present();
    } );
  }

}
