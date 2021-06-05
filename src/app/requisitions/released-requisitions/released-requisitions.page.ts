import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RequisitionService } from '../requisition.service';
import { Stockissue } from 'src/app/models/stockissue.model';
import { StockdetailService } from 'src/app/stock-details/stockdetail.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-released-requisitions',
  templateUrl: './released-requisitions.page.html',
  styleUrls: ['./released-requisitions.page.scss'],
})
export class ReleasedRequisitionsPage implements OnInit, OnDestroy {

  requisitionSub: Subscription;
  requisitions: Array<Stockissue>;
  searchTerm: string = null;

  constructor( 
    private stockService: StockdetailService,
    private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.requisitionSub = this.stockService.releasedrequisitions.subscribe( result => {
      this.requisitions = result;
    });
  }

  search($event) {

    // get a copy of requisitions
    const searchItems = [... this.requisitions];

    // Begin search, only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.requisitions = searchItems.filter((req) => {
        if ( req.Stock_Issue_No && req.Stock_Issue_No.length > 1 ){
          return ( req.Stock_Issue_No.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provided display all requisitions
      this.initializeItems();
    }
  }

  initializeItems() {
    this.requisitionSub = this.stockService.releasedrequisitions.subscribe( result => {
      this.requisitions = result;
    });
  }

  

  ngOnDestroy() {
    if ( this.requisitionSub ) {
      this.requisitionSub.unsubscribe();
    }
  }




}
