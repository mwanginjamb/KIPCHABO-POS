import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Salesorder } from 'src/app/models/salesorder.model';
import { Salesorderline } from 'src/app/models/salesorderline.model';
import { ModalController, AlertController } from '@ionic/angular';
import { LinesComponent } from '../lines/lines.component';
import { Invoice } from 'src/app/models/invoice.model';
import { Salesinvoiceline } from 'src/app/models/salesinvoiceline.model';
import { PaymentsService } from 'src/app/payments/payments.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  No = null;
  cardSub: Subscription ;
  card: Invoice = new Invoice();
  line: Salesinvoiceline;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private paymentservice: PaymentsService,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.No = this.activatedRoute.snapshot.paramMap.get('No');

    this.cardSub = this.orderService.ordercard(this.No).subscribe( result => {
      this.card = result;
      console.log(result);
    });

  }


  onAddLine() {
    this.modalCtrl.create(
      {
        component: LinesComponent,
        componentProps: { docID: this.No }
      }
    ).then( modalEl => {
      modalEl.present();
    });
  }

  post(No){
    console.log(No);
    this.orderService.postSalesInvoice(No).subscribe(res => {
      if (typeof res === 'string'){ // a string response represents a Nav Error, so we display it.
        this.alertCtrl.create({
          header: 'Service Warning!',
          message: res,
          buttons: [{ text: 'Okay' }]
        }).then( alertEl => {
          alertEl.present();
        });
      }else{ // An object - Normal success response from nav
        this.paymentservice.showToast(`Sales Invoice Posted Successfully.`);
      }
    }, error => { // Request related errors from subscription - e.g Network timeouts, service inavailability etc.
      alert(error);
    });
  }

  onUpdateLine(LineNo: string) {
    this.modalCtrl.create({
      component: LinesComponent,
      componentProps: { docID: this.No, LineNo }
    })
    .then( modalEl => {
      modalEl.present();
    } );
  }



}
