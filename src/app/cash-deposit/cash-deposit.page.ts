import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { Cashdeposit } from '../models/cashdeposit.model';
import { Cashdepositheader } from '../models/cashdepositheader.model';
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
  cashDepositHeader = new Cashdepositheader();
  cashDepositSub: Subscription;
  documentNo$ = new Subject<string>();
  cardSub: Subscription;

  

  constructor(
    public authService: AuthService,
    public depositSvc: CashDepositService,
    public utilitySvc: UtilityService,
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.setUser();
    this.popoverCtrl.dismiss();
  }

  private getDocumentNo$() {
    return this.documentNo$;
  }


  ionViewWillEnter() {
    this.setUser();
    console.log('Will Enter');
    this.FetchDeposits;
  }
  ionViewDidEnter() {
      this.setUser();
      console.table(this.user);
      console.log('Did Enter');
      this.FetchDeposits();
  }

  
  async setUser() {
    this.user = await this.authService.getUser();
    this.userID = this.user?.User_ID;
    
  }

  FetchDeposits() {

    
      this.depositSub = this.depositSvc.getCashdeposits(this.userID)
      .pipe(
        finalize( () => {
          this.isLoading = false;
        })
      )
      .subscribe(result => {
      
        this.depositsList = this.sort([...result]); 
      }
      , error => {
        console.log(error.error);
        this.utilitySvc.showAlert(error.error.message);
      });
    
    
  }

  FetchCard(No: string) {
     this.cardSub = this.depositSvc.getCardByNo(No)
      .subscribe(result => {
        console.log(`Getting payload.....................`);
        console.table(result);
        this.cashDeposit = result;
        this.documentNo$.next(result.Key);
      });
  }

  sort(dataArray: Cashdeposit[]){
    return dataArray.sort((a,b) => (b.No > a.No) ? 1: -1);
  }

  initialRequest() {
    
    if(this.userID.length)
    {
      // this.cashDepositHeader.Created_By = this.userID;
      this.cashDepositSub = this.depositSvc.newDeposit(this.userID)
      .subscribe(res => {
        console.log(`Initialize Cash Deposit`);
        // FETCH THE DAMN cashCard
        this.FetchCard(res);
        
      }, error => {
        this.utilitySvc.showAlert(error);
      });
    }

  
      
  }

  onAddDeposit() {
    // Pull up the modal and populate the CashDeposit MODEL with initial ERP data
    this.initialRequest();
    this.getDocumentNo$().subscribe(res => {
      if(res)
      {
        console.log('Payload');
        console.log(this.cashDeposit);
        this.modalCtrl.create({
          component: NewDepositComponent,
          componentProps: { cashDepo: this.cashDeposit }
        })
        .then( modalEl => {
          modalEl.present();
        });
      }
     
      return;
    });
      
      
       
    
   

    
      
    
    
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
