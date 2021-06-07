import { Component, OnInit, OnDestroy } from '@angular/core';
import { Requisition } from './requisition.model';
import { RequisitionService } from './requisition.service';
import { Subscription } from 'rxjs';
import { MenuController, PopoverController, AlertController } from '@ionic/angular';
import { ReqPopoverComponent } from './req-popover/req-popover.component';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';


@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.page.html',
  styleUrls: ['./requisitions.page.scss'],
})
export class RequisitionsPage implements OnInit, OnDestroy {

  isLoading = false;
  user: any;
  userID: string;

  constructor(
    private requisitionService: RequisitionService,
    private menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public authService: AuthService
    ) { }

  requisitions: Array<Requisition>;
  requisitionSub: Subscription;
  searchTerm: string = null;

  ngOnInit() {
      this.isLoading = true; 
      this.setUser();   
  }

  ionViewWillEnter() {
    this.setUser();
    console.log('Will Enter');
    this.FetchRequisitions();
  }
  
  ionViewDidEnter() {
    this.setUser();
    console.table(this.user);
    console.log('Did Enter');
    this.FetchRequisitions();

    
  }

  async setUser() {
    this.user = await this.authService.getUser();
    this.userID = this.user?.User_ID;
  }

  FetchRequisitions() {
    this.requisitionSub = this.requisitionService.getRequisitions(this.userID)
      .subscribe( result => {
        this.requisitions  = this.sort([...result]);
        this.isLoading = false;
        console.log(this.requisitions);
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertCtrl.create({
          header: 'Service Error!',
          message: 'Connection problem: ' + error.error.message ,
          buttons: [{ text: 'Okay' }]
        })
        .then(alertEl => {
          alertEl.present();
        });
      });
  }


  

  search($event) {

    // get a copy of requisitions
    const searchItems = [... this.requisitions];

    // Begin search, only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.requisitions = searchItems.filter((req) => {
        if ( req.Req_No && req.Req_No.length > 1 ){
          return ( req.Req_No.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provided display all requisitions
      this.initializeItems();
    }
  }

  initializeItems() {
    this.requisitionSub = this.requisitionService.getRequisitions(this.userID).subscribe( result => {
      this.requisitions = result;
      // console.log(this.requisitions);
    });
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  async presentPopover(event) {
    return await this.popoverCtrl.create({
      component: ReqPopoverComponent,
      event
    }).then(pop => {
      pop.present();
    });
   // return await popover.present();
  }

  sort(dataArray){
    return dataArray.sort((a,b) => (b.Req_No > a.Req_No)? 1: -1);
  }

  ngOnDestroy() {
    // check if subscription is active / truthy then terrorize it. Like ( not same as) a destructor in php
    if (this.requisitionSub) {
        this.requisitionSub.unsubscribe();
    }
  }

}
