import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Salesinvoiceline } from 'src/app/models/salesinvoiceline.model';
import { ItemService } from '../../items/item.service';
import { RequisitionService } from 'src/app/requisitions/requisition.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Item } from 'src/app/items/item.model';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent implements OnInit, OnDestroy {

  @Input() docID: number;
  @Input() LineNo: string;

  items: any = null;
  locations: any;
  itemSub: Subscription;
  updateLineSub: Subscription;
  units = [];
  unitSub: Subscription;
  locationsSub: Subscription;


  line: Salesinvoiceline = new Salesinvoiceline();

  constructor(
    private modalCtrl: ModalController,
    private itemService: ItemService,
    private requisitionService: RequisitionService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtr: AlertController,
    private router: Router,
    private orderService: OrderService,
    private alertCtrl: AlertController
    ){    }

  ngOnInit() {

    this.itemSub = this.itemService.items.subscribe(res => {
      console.log(typeof res);
      if ( typeof(res) === 'object') {
        this.items = [...res];
      }
    });

    if ( this.LineNo ){
      this.FetchLinetoUpdate();
    }
    this.FetchLocations();

  }

  getUnit($event) {
        this.unitSub = this.requisitionService.getunits(this.line.No).subscribe( units => {
        this.units = units;
        this.line.Document_No = this.docID;
    });
  }

  addLine() {
    this.orderService.postLine(this.line).subscribe( line => {
      console.log(line);
      if (line) {
        // this.navCtrl.navigateForward('/requisitions/' + this.docId);
        this.modalCtrl.dismiss();
        // Show a Toast Notification
        this.toastCtrl.create({
          message: `Sales Invoice Line Added Successfully.`,
          duration: 3000,
          position: 'top'
        }).then((toastData) => {
          toastData.present();
        });
      } else {
        // Alert the error
        console.log(line);
        this.alertCtrl.create(
          {
            header: 'Operation Error',
            message: 'Message : ' + line?.error,
            buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
          }
        ).then( alertEl => {
          alertEl.present();
        });
      }
    }, error => {
        console.log(error.error);
        this.alertCtr.create({
          header: 'Service Error!',
          message: 'Connection problem: ' + error ,
          buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
        })
        .then(alertEl => {
          alertEl.present();
        });
    });
  }

  updateLine() {

    this.orderService.updateInvoiceLine(this.line).subscribe( line => {
        if (line){
            console.log(line);
            this.toastCtrl.create({
              header: 'Success!',
              message: `${line.Description} Invoice Line Updated Successfully.`,
              duration: 3000,
              position: 'top',
            }).then((toastData) => {
              toastData.present();
            });

            this.modalCtrl.dismiss();
            this.router.navigate(['/orders/' + line.Document_No]);

        }else {
           // Alert the error
           this.alertCtrl.create(
            {
              header: 'Operation Error',
              message: 'Message : ' + line,
              buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
            }
          ).then( alertEl => {
            alertEl.present();
          });
        }
    }, error => {
        console.log(error.error);
        this.alertCtr.create({
          header: 'Service Error!',
          message: 'Connection problem: ' + error ,
          buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
        })
        .then(alertEl => {
          alertEl.present();
        });
    } );
  }


  FetchLinetoUpdate(){
    this.updateLineSub = this.orderService.getLine(this.docID, this.LineNo)
    .subscribe(res => {
     Object.assign(this.line, res);
    });
  }

  FetchLocations(){
    this.locationsSub = this.requisitionService.getLocations().subscribe( loc => {
      this.locations = loc;
    });
  }


  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }
    if (this.unitSub) {
      this.unitSub.unsubscribe();
    }
    if (this.updateLineSub) {
      this.updateLineSub.unsubscribe();
    }
  }

}
