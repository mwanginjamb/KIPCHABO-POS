import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Stockissue } from '../models/stockissue.model';
import { LinesComponent } from './lines/lines.component';
import { StockdetailService } from './stockdetail.service';


@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.page.html',
  styleUrls: ['./stock-details.page.scss'],
})
export class StockDetailsPage implements OnInit {

  card: Stockissue;
  cardSub: Subscription;
  id: string;
  loading: HTMLIonLoadingElement;

  constructor(
    private stockService: StockdetailService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    // this.presentLoading();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.cardSub = this.stockService.requisitioncard(this.id)
    .pipe(
      finalize(async() => {
        await this.loading.dismiss();
      })
    )
    .subscribe( cardInfo => {
      this.card = cardInfo;
      console.log(this.card);
    });
  }

  refresh(event){
    this.cardSub = this.stockService.requisitioncard(this.id).subscribe( result => {
      this.card = result;
      if (event){
        event.target.complete();
      }
    });
  }

  onUpdateLine(Key: string) {

    this.modalCtrl.create({
      component: LinesComponent,
      componentProps: { Key }
    })
    .then( modalEl => {
      modalEl.present();
    } );
  }

  onUpdateCard(event) {
    let issue_date = event.target.value;
    this.card.Receipt_Date = this.stockService.formatDate(issue_date);
    this.stockService.updateStockIssue(this.card).subscribe( line => {
      if ( typeof line !== 'string'){
          
          this.toastCtrl.create({
            message: `Document ${line.Stock_Issue_No}  Updated Successfully.`,
            duration: 3000,
            position: 'top'
          }).then((toastData) => {
            toastData.present();
          });
          this.modalCtrl.dismiss();
          // this.router.navigate(['/requisitions/' + line.Document_No]);

      }else {
         // Alert the error
         this.alertCtrl.create(
          {
            header: 'Operation Error',
            message: 'Error : ' + line,
            buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
          }
        ).then( alertEl => {
          alertEl.present();
        });
      }
  }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error.message ,
        buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
      })
      .then(alertEl => {
        alertEl.present();
      });
  });
  }

  async presentLoading(message?: string) {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots',
      animated: true,
      message: (message)? message:'Loading Data...'
    });
  
    await this.loading.present();
  }

  post(ReceiptNo){
    console.log(ReceiptNo);
    this.stockService.acknowledgeStockIssue(ReceiptNo).subscribe(res => {
      if (typeof res === 'string'){ // a string response represents a Nav Error, so we display it.
        this.alertCtrl.create({
          header: 'Service Warning!',
          message: res,
          buttons: [{ text: 'Okay' }]
        }).then( alertEl => {
          alertEl.present();
        });
      }else{
        // alert(res);
        this.stockService.showToast(`Document Posted Successfully.`);
      }

    }, error => {
      alert(error);
    });
  }

}
