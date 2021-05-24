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

  @Input() Item_No: string;
  @Input() Stock_Issue_No: string;

  updateLineSub: Subscription;

  line: Stockissueline = new Stockissueline();
  constructor(
    private stockService: StockdetailService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log(this.Item_No);
    console.log(this.Stock_Issue_No);
  }

  updateLine() {

    // Format Date to YYYY-MM-DD
    // const recDate = new Date(this.line.Receipt_Date);
    // const month = (recDate.getMonth() + 1) > 9 ? recDate.getMonth() + 1 : `0` + (recDate.getMonth() + 1);
    // const day = ( recDate.getDate() ) > 9 ? recDate.getDate() : `0` + recDate.getDate();
    // this.line.Receipt_Date =  `${recDate.getFullYear()}-${month}-${day}`;
    // console.table(this.line); return;

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
      this.updateLineSub = this.stockService.getLine(this.Item_No, this.Stock_Issue_No)
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
