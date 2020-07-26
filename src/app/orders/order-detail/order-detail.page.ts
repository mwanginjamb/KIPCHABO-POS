import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Salesorder } from 'src/app/models/salesorder.model';
import { Salesorderline } from 'src/app/models/salesorderline.model';
import { ModalController } from '@ionic/angular';
import { LinesComponent } from '../lines/lines.component';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  No = null;
  cardSub: Subscription ;
  card: Salesorder = new Salesorder();
  line: Salesorderline;

  constructor( private activatedRoute: ActivatedRoute, private orderService: OrderService, private modalCtrl: ModalController) { }

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
