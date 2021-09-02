import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';
import { PaymentsService } from '../payments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ReceiptPopoverComponent } from '../receipt-popover/receipt-popover.component';
import { NewCashLineComponent } from '../new-cash-line/new-cash-line.component';
import { AuthService } from 'src/app/auth/auth-service';
import { UtilityService } from 'src/app/utility.service';
import { finalize } from 'rxjs/operators';

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
  updateSub: Subscription;
  user: any;

  constructor(
    private paymentService: PaymentsService,
    private activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    private utilitySvc: UtilityService
    ) { }

  ngOnInit( ) {
    this.No = this.activatedRoute.snapshot.paramMap.get('id');
    this.FetchCard();
    this.FetchBanks();

    this.paymentService.refresh$.subscribe( () => {
      this.FetchCard();
    } );
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

  FetchCard(){
    this.cardSub = this.paymentService.getPayment(this.No).subscribe( result => {
      this.card = result;
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
    this.utilitySvc.presentLoading('Posting transaction .....');
    this.paymentService.postReceipt(ReceiptNo)
    .pipe(
      finalize( async() => {
        this.utilitySvc.loadingCtrl.dismiss();
      })
    )
    .subscribe(res => {
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
        setTimeout(() => {
          this.router.navigate(['../payments'])
        },3000);
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
    this.modalCtrl.create(
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

  updateReceipt($event){
    
    this.card.Created_By = this.user?.User_ID;
    // console.table(this.card); return;
    this.updateSub = this.paymentService.updateReceipt(this.card).subscribe( res => {
      console.log(res);
      if (typeof res === 'object') {
          Object.assign(this.card, res);
          this.toastCtrl.create({
            message: `Receipt Updated Successfully.`,
            duration: 2000,
            position: 'top'
          }).then((toastData) => {
            toastData.present();
          });
      }else {
        this.alertCtrl.create({
          header: 'New Payment Error!',
          message: 'ERP Error : ' + res ,
          buttons: [{ text: 'Okay' }]
        })
        .then(alertEl => {
          alertEl.present();
        });
      }
    }, error => {
      this.alertCtrl.create({
        header: 'New Payment Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay' }]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
  }

}
