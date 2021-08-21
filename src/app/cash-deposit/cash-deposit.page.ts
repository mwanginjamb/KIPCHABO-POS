import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { Cashdeposit } from '../models/cashdeposit.model';
import { UtilityService } from '../utility.service';
import { CashDepositService } from './cash-deposit.service';
import { NewDepositComponent } from './new-deposit/new-deposit.component';

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.page.html',
  styleUrls: ['./cash-deposit.page.scss'],
})
export class CashDepositPage implements OnInit {

  depositSub: Subscription;
  depositsList: Cashdeposit[];
  isLoading = true;
  searchTerm: string = null;
  user: any;
  userID: string;
  cashDeposit: Cashdeposit = new Cashdeposit();
  cashDepositSub: Subscription;
  

  constructor(
    public authService: AuthService,
    public depositSvc: CashDepositService,
    public utilitySvc: UtilityService,
    public modalCtrl: ModalController
  ) { }

  async ionViewWillEnter() {
     await this.setUser();
  }

  async ionViewDidEnter() {
     await this.setUser();
  }

  async ngOnInit() {
    await this.setUser();
    console.log(this.userID);
    if(this.userID)
    {
      this.FetchDeposits();
    }
    
  }

  async setUser() {
    this.user = await this.authService.getUser();
    this.userID = this.user?.User_ID;
    
  }

  FetchDeposits() {
  
    if( this.userID ) {
      this.depositSub = this.depositSvc.getCashdeposits(this.userID)
      .pipe(
        finalize( () => {
          this.isLoading = false;
        })
      )
      .subscribe(result => {
      
        this.depositsList = this.sort([...result]);
        
      }, error => {
        console.log(error.error);
        this.utilitySvc.showAlert(error.error.message);
      });
    }
    
  }

  sort(dataArray: Cashdeposit[]){
    return dataArray.sort((a,b) => (b.No > a.No) ? 1: -1);
  }

  initialRequest() {
      this.cashDeposit.Created_By = this.userID;
      this.cashDepositSub = this.depositSvc.newDeposit(this.cashDeposit)
      .subscribe(res => {
        this.cashDeposit = res;
      });
  }

  onAddDeposit() {
    // Pull up the modal and populate the CashDeposit MODEL with initial ERP data
    
    this.initialRequest(); // Call ERP endpoint for creating a new CD Document

    if(this.cashDeposit.Key) {
      // console.log(`Credit Depo Param to component`);
      // console.table(this.cashDeposit);
      
      this.modalCtrl.create({
        component: NewDepositComponent,
        componentProps: { cashDepo: this.cashDeposit }
      })
      .then( modalEl => {
        modalEl.present();
      });
    }
    
  }

  searchPayment($event){
    const searchItems = [...this.depositsList];
    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.depositsList = searchItems.filter((payment) => {
        if ( payment.No && payment.No.length > 1 ){
          return ( payment.No.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.FetchDeposits();
    }
  }

}
