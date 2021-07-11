import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { Customer } from '../models/customer.model';
import { PaymentsService } from '../payments/payments.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit, OnDestroy {

  customerListSub: Subscription;
  customers: Customer[] = null;
  user: any;
  userID: string;
  searchTerm: string = null;


  constructor(
    private utilitySvc: UtilityService,
    private paymentService: PaymentsService,
    private authSvc: AuthService
    ) { }

  ngOnInit() {
    this.setUser();
  }

  ionViewWillEnter() {
    this.setUser();
    console.log(this.user);
  }

  ionViewDidEnter() {
    this.FetchCustomers();
    // console.table(this.user);
  }

  FetchCustomers() {
    this.utilitySvc.presentLoading('Loading Customers ....');
    this.customerListSub = this.paymentService.CustomerBySalesPerson(this.userID)
    .pipe(
      finalize( async () => {
        this.utilitySvc.loadingCtrl.dismiss();
      })
    )
    .subscribe( cust => {
      console.log(cust);
      this.customers = cust;
    });
  }

  async setUser() {
    this.user = await this.authSvc.getUser();
    this.userID = this.user?.User_ID;
  }

  search($event) {

    // get a copy of requisitions
    const searchItems = [... this.customers];

    // Begin search, only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.customers = searchItems.filter((req) => {
        if ( req.Name && req.Name.length > 1 ){
          return ( req.Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provided display all requisitions
      this.initializeItems();
    }
  }

  initializeItems() {
    this.FetchCustomers();
  }

  ngOnDestroy() {
    if(this.customerListSub) {
      this.customerListSub.unsubscribe();
    }
  }

}
