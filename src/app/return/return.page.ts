import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { Postedsalesinvoice } from '../models/postedsalesinvoice.model';
import { Return } from '../models/return.model';
import { SalesService } from '../postedsalesinvoices/sales.service';
import { UtilityService } from '../utility.service';
import { ReturnService } from './return.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {

  card: Return = new Return();
  cardSub: Subscription;
  postedInvoiceNo: string;
  postedSalesInvoice: Postedsalesinvoice;
  postedSalesSub: Subscription;
  user: any;
  userID: string;


  constructor(
    private utilitySvc: UtilityService,
    private activatedRoute: ActivatedRoute,
    private SalesSvs: SalesService,
    private returnSvc: ReturnService,
    private authSvc: AuthService
    ) { }

  ngOnInit() {
    this.postedInvoiceNo = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.setUser();
    this.userID = this.user?.User_ID;
  }

  ionViewDidEnter() {
    this.FetchPostedInvoice();
    this.setUser();
    this.userID = this.user?.User_ID;
  }

  async setUser() {
    this.user = await this.authSvc.getUser();
  }

  FetchPostedInvoice() {
    this.postedSalesSub = this.SalesSvs.getSale(this.postedInvoiceNo).subscribe( result => {
      this.postedSalesInvoice = result;
    })
  }

  CreateReturn() {
    this.card.Applies_to_Invoice_No = this.postedSalesInvoice.No;
    this.card.Customer_No = this.postedSalesInvoice.Customer_No;
    this.card.Created_By = this.userID;
    this.cardSub = this.returnSvc.ReturnTransaction(this.card).subscribe(res => {
      if(typeof res === 'string')
      {
        this.utilitySvc.showAlert(res);
        return;
      }
      this.card = res;
    }, err => {
      this.utilitySvc.showAlert(err);
      return;
    });
  }

}
