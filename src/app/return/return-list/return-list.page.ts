import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';
import { Return } from 'src/app/models/return.model';
import { UtilityService } from 'src/app/utility.service';
import { ReturnService } from '../return.service';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.page.html',
  styleUrls: ['./return-list.page.scss'],
})
export class ReturnListPage implements OnInit {

  returnSub: Subscription;
  list: Return[];
  user: any;
  userID: string;
  isLoading = false;
  searchTerm: string;

  constructor(
    private utilitySvc: UtilityService,
    private returnSvc: ReturnService,
    private authSvc: AuthService
    ) { }

  ngOnInit() {
    this.setUser();
  }

  ionViewWillEnter() {
    this.setUser();
  }

  ionViewDidEnter() {
    this.setUser();
    this.FetchReturns();
  }

  async setUser() {
    this.user = await this.authSvc.getUser();
    this.userID = this.user?.User_ID;
    console.table(this.userID);
  }

  FetchReturns() {
    this.returnSub = this.returnSvc.getReturnTransactions(this.userID)
      .subscribe( result => {

        if(typeof result === 'string') {
          this.isLoading = false;
          this.utilitySvc.showAlert(result);
          return;
        }
        this.list  = this.sort([...result]);
        this.isLoading = false;
        
      }, error => {
        this.isLoading = false;
        
        this.utilitySvc.showAlert('Error: ' + error.erro.message);
      });
  }

  sort(dataArray){
    return dataArray.sort((a,b) => (b.No > a.No)? 1: -1);
  }

  search($event) {

    // get a copy of requisitions
    const searchItems = [... this.list];

    // Begin search, only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.list = searchItems.filter((req) => {
        if ( req.Customer_Name && req.Customer_Name.length > 1 ){
          return ( req.Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provided display all requisitions
      this.initializeItems();
    }
  }

  initializeItems() {
    this.FetchReturns();
  }


}
