import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent implements OnInit {

  @Input() docID: number;
  @Input() LineNo: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(`Doc No. is ${this.docID}`);
    if ( this.LineNo ){
      console.log(`Line No. is ${this.LineNo}`);
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
