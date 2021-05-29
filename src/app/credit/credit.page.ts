import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Credit } from '../models/credit.model';
import { CreditService } from './credit.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  listSub: Subscription;
  list: Credit[];
  isLoading: boolean = true;
  searchTerm: string = null;

  constructor(private creditService: CreditService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.fetchCreditSales();
  }

  fetchCreditSales() {
    this.listSub = this.creditService.creditList.subscribe(result => {
      this.list = this.sort([...result]);
      this.isLoading = false;
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.error.message ,
        buttons: [{ text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }

  searchPayment($event){
    const searchItems = [...this.list];
    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.list = searchItems.filter((item) => {
        if ( item.Customer_Name && item.Customer_Name.length > 1 ){
          return ( item.Customer_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.fetchCreditSales();
    }
  }

  sort(dataArray: Credit[]){
    return dataArray.sort((a,b) => (b.No > a.No) ? 1: -1);
  }

  presentPopover($event) {
    return;
  }

}
