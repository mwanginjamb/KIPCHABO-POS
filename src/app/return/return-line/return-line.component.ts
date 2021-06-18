import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ItemService } from 'src/app/items/item.service';
import { Returnline } from 'src/app/models/returnline.model';
import { RequisitionService } from 'src/app/requisitions/requisition.service';
import { UtilityService } from 'src/app/utility.service';
import { ReturnService } from '../return.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-return-line',
  templateUrl: './return-line.component.html',
  styleUrls: ['./return-line.component.scss'],
})
export class ReturnLineComponent implements OnInit {

  @Input() docId: string;
  @Input() key: string;
  lineSub: Subscription;
  itemSub: Subscription;
  locationSub: Subscription;
  line: Returnline =  new Returnline();

  items = [];
  locations: Location[];

  constructor(
    private returnSvc: ReturnService,
    private utilitySvc: UtilityService,
    private modalCtrl: ModalController,
    private itemSvc: ItemService,
    private requisitionSvc: RequisitionService

    ) { }

  ngOnInit() {
    this.fetchLocations();
    this.fetchItems();
  }

  fetchItems() {
    this.utilitySvc.presentLoading(`Loading Items...`);
    this.itemSub = this.itemSvc.items
    .pipe(
      finalize( async() => {
        this.utilitySvc.loadingCtrl.dismiss();
      })
    )
    .subscribe( items => {
      this.items = items;
    });
  }

  fetchLocations() {
    this.locationSub = this.requisitionSvc.getLocations().subscribe( res => {
      console.log('Locations');
      console.log(res);
      this.locations = res;
    });
  }

  addLine() {
    this.utilitySvc.presentLoading('Saving ....');
    this.line.No = this.docId;
    this.lineSub = this.returnSvc.returnLine(this.line)
    .pipe(
      finalize( async () => {
        this.utilitySvc.loadingCtrl.dismiss();
      })
    )
    .subscribe(res => {
      if(typeof res === 'string') {
        this.utilitySvc.showAlert(res);
        return;
      }
      this.utilitySvc.showToast('Line Added Successfully.');
      setTimeout(()=> {
        this.modalCtrl.dismiss();
      },2500);
    }, err => {
      this.utilitySvc.showAlert(err.message);
    });
  }

  updateLine()
  {
    this.lineSub = this.returnSvc.returnLine(this.line).subscribe(res => {
      if(typeof res === 'string') {
        this.utilitySvc.showAlert(res);
      }
      this.utilitySvc.showToast('Line Updated Successfully.');
   
      setTimeout(()=> {
        this.modalCtrl.dismiss();
      },2500);
   
    }, err => {
      this.utilitySvc.showAlert(err.message);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
