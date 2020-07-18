import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RequisitionService } from '../requisition.service';
import { Requisition } from '../requisition.model';

@Component({
  selector: 'app-released-requisitions',
  templateUrl: './released-requisitions.page.html',
  styleUrls: ['./released-requisitions.page.scss'],
})
export class ReleasedRequisitionsPage implements OnInit, OnDestroy {

  requisitionSub: Subscription;
  requisitions: Array<Requisition>;
  searchTerm: string = null;

  constructor( private requisitionService: RequisitionService ) { }

  ngOnInit() {
    this.requisitionSub = this.requisitionService.releasedrequisitions.subscribe( result => {
      this.requisitions = result;
    });
  }

  search($event) {

    // get a copy of requisitions
    const searchItems = [... this.requisitions];

    // Begin search, only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.requisitions = searchItems.filter((req) => {
        if ( req.No && req.No.length > 1 ){
          return ( req.No.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provided display all requisitions
      this.initializeItems();
    }
  }

  initializeItems() {
    this.requisitionSub = this.requisitionService.releasedrequisitions.subscribe( result => {
      this.requisitions = result;
    });
  }

  ngOnDestroy() {
    if ( this.requisitionSub ) {
      this.requisitionSub.unsubscribe();
    }
  }




}
