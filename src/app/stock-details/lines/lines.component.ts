import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Stockissueline } from 'src/app/models/stockissueline.model';
import { StockdetailService } from '../stockdetail.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent implements OnInit {

  @Input() Key: string;


  updateLineSub: Subscription;

  line: Stockissueline = new Stockissueline();
  constructor(
    private stockService: StockdetailService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log(this.Key);

    if(this.Key) {
      this.FetchLinetoUpdate();
    }
    
  }

  updateLine() {

    this.stockService.updateRequisitionLine(this.line).subscribe( line => {
        if ( typeof line !== 'string'){
            console.log(`Updated Line.......`);
            console.table(line);
            this.toastCtrl.create({
              message: `${line.Description} Requisition Line Updated Successfully.`,
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
              message: 'Message : ' + line,
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
          message: 'Connection problem: ' + error.error ,
          buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
        })
        .then(alertEl => {
          alertEl.present();
        });
    });

    }

    FetchLinetoUpdate(){
      this.updateLineSub = this.stockService.getLine(this.Key)
      .subscribe(res => {
       Object.assign(this.line, res);
      }, error => {
        console.log(error.error);
        this.alertCtrl.create({
          header: 'Service Error!',
          message: 'Connection problem: ' + error.error.message ,
          buttons: [{ text: 'Okay', handler: () => this.modalCtrl.dismiss() }]
        })
        .then(alertEl => {
          alertEl.present();
        });
      });
    }
    // Closing component modal

    onCancel() {
      this.modalCtrl.dismiss();
    }


}
