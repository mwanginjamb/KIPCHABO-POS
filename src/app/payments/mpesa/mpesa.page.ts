import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ITrasaction } from 'src/app/models/mpesa.model';
import { UtilityService } from 'src/app/utility.service';
import { PaymentsService } from '../payments.service';


@Component({
  selector: 'app-mpesa',
  templateUrl: './mpesa.page.html',
  styleUrls: ['./mpesa.page.scss'],
})

export class MpesaPage implements OnInit, OnDestroy {

  mpesaSub: Subscription;
  transactions: ITrasaction[];
  isLoading: boolean;
  transaction: ITrasaction;
  searchTerm: string;

 

  constructor(private paymentSvc: PaymentsService, private utilitySvc: UtilityService) { }

  ngOnInit() {
    this.FetchTransactions();
  }

  FetchTransactions() { 
    this.mpesaSub = this.paymentSvc.Mpesa()
    .pipe(
      finalize(
        () => {
          this.isLoading = false;
        }
      )
    )
    .subscribe(result => {
      this.transactions = this.sort([...result]);
    }, error => {
     this.utilitySvc.showAlert(error.error.message);
    });
  }


  ngOnDestroy(){
    if ( this.mpesaSub ){
      this.mpesaSub.unsubscribe();
    }
  }

  searchPayment($event){
    const searchItems = [...this.transactions];
    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.transactions = searchItems.filter((transaction) => {
        if ( transaction.Phone && transaction.Phone.length > 1 ){
          return ( transaction.Phone.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.FetchTransactions();
    }
  }

  sort(dataArray: ITrasaction[]){
    return dataArray.sort((a,b) => (b.Transaction_Date > a.Transaction_Date) ? 1: -1);
  }

}
