import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
import { Postedsalesinvoice } from '../../models/postedsalesinvoice.model';
import { Return } from '../../models/return.model';
import { PaymentsService } from '../../payments/payments.service';
import { SalesService } from '../../postedsalesinvoices/sales.service';
import { UtilityService } from '../../utility.service';
import { ReturnLineComponent } from '../return-line/return-line.component';
import { ReturnService } from '../return.service';

@Component({
  selector: 'app-return-card',
  templateUrl: './return-card.page.html',
  styleUrls: ['./return-card.page.scss'],
})
export class ReturnCardPage implements OnInit {

  card: Return = new Return();
  cardSub: Subscription;
  lineSub: Subscription;
  customerListSub: Subscription;
  custSub: Subscription;
  postedInvoiceNo: string;
  postedSalesInvoice: Postedsalesinvoice;
  postedSalesSub: Subscription;
  user: any;
  userID: string;
  customers: {};
  Key: string;

  constructor(
      private utilitySvc: UtilityService,
      private activatedRoute: ActivatedRoute,
      private SalesSvs: SalesService,
      private returnSvc: ReturnService,
      private authSvc: AuthService,
      private modalCtrl: ModalController,
      private paymentSvc: PaymentsService
  ) { }

  ngOnInit() {
      this.Key = this.activatedRoute.snapshot.paramMap.get('Key');
      this.FetchReturnByKey(this.Key);
      
  }

  FetchCustomers() {
    this.customerListSub = this.paymentSvc.Customers.subscribe( cust => {
      console.log(cust);
      this.customers = cust;
    });
  }

  FetchReturnByKey(Key) {
    this.cardSub = this.returnSvc.getReturnTransaction(Key).subscribe( res => {
      if(typeof res === 'string') {
        this.utilitySvc.showAlert(res);
        return;
      }
      this.card = res;
      console.log(`The return card...`);
      console.log(res);
       return;
      
    }, err => {
      this.utilitySvc.showAlert(err.error.message);
    });
  }

 

  async setUser() {
    this.user = await this.authSvc.getUser();
    this.userID = this.user?.User_ID;
  }

  FetchPostedInvoice() {
    console.log(`Fetch Posted Invoice Invoked ............`);
    this.postedSalesSub = this.SalesSvs.getSale(this.postedInvoiceNo).subscribe( result => {
      this.postedSalesInvoice = result;
      this.card.Applies_to_Invoice_No = result.No;
      this.card.Created_By = this.userID;

      console.log('Invoice To be returned.');
      console.table(result);


    // Get customer No

    this.custSub = this.paymentSvc.Customer(result.Sell_to_Customer_Name).subscribe(cust => {
        this.card.Customer_No = cust[0].No;
        /*console.log('Our Customer');
        console.table(cust[0]);
        console.log('Return Card to post.');
        console.table(this.card);*/
        this.CreateReturn();
      });  

    })
  }

  CreateReturn() {

    console.log(`Create called....`);
    this.cardSub = this.returnSvc.ReturnTransaction(this.card).subscribe(res => {
      if(typeof res === 'string')
      {
        /*this.utilitySvc.showAlert(res);
        return;*/
      }
      this.card = res;
    }, err => {
     /* this.utilitySvc.showAlert(err);
      return;*/
    });
  }

  onReturnUpdate(){
    this.card.Return_Date = this.utilitySvc.formatDate(this.card.Created_On);
     
    this.cardSub = this.returnSvc.ReturnTransaction(this.card)
    .subscribe( res => {
      if(typeof res === 'string')
      {
        /*this.utilitySvc.showAlert(res);
        return;*/
      }
      this.utilitySvc.showToast('Return Updated Successfully.');
      this.card = res;
    }, err => {
     /* this.utilitySvc.showAlert(err);
      return;*/
    });
  }

  // Pull Down to Refresh

  refresh(event){
    this.cardSub = this.returnSvc.getReturnTransaction(this.card.Key).subscribe( result => {
      this.card = result;
      if (event){
        event.target.complete();
      }
    });
  }

// Show Line modal form
onAddLine(Return_No: string) {
  this.modalCtrl.create(
    {
      component: ReturnLineComponent,
      componentProps: { docId: Return_No }
    }
  ).then( modalEl => {
    modalEl.present();
  });
}

onUpdateLine(key: string) {
  
  this.lineSub =  this.returnSvc.fetchLine(key).subscribe(res => {
    this.modalCtrl.create({
      component: ReturnLineComponent,
      componentProps: {line: res}
    }).then( modalEl => {
      modalEl.present();
    });
  });
}

ngOnDestroy() {
  if(this.cardSub) {
    this.cardSub.unsubscribe();
  }

  if(this.lineSub) {
    this.lineSub.unsubscribe();
  }

  if(this.custSub) {
    this.custSub.unsubscribe();
  }
}

}
