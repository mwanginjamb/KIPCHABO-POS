import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakeIdbackComponent } from '../take-idback/take-idback.component';
import { TakeIdfrontComponent } from '../take-idfront/take-idfront.component';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

@Component({
  selector: 'app-details-popover',
  templateUrl: './details-popover.component.html',
  styleUrls: ['./details-popover.component.scss'],
})
export class DetailsPopoverComponent implements OnInit {

  @Input() FarmerID: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}


  async takePhoto() {

    const modal = await this.modalCtrl.create({
      component: TakePhotoComponent,
      componentProps: { FarmerID: this.FarmerID }
    });

    return await modal.present();

  }

  async takeIdFront() {
    const modal = await this.modalCtrl.create({
      component: TakeIdfrontComponent,
      componentProps: { FarmerID: this.FarmerID }
    });

    return await modal.present();
  }

  async takeIdBack() {
    const modal = await this.modalCtrl.create({
      component: TakeIdbackComponent,
      componentProps: { FarmerID: this.FarmerID }
    });

    return await modal.present();
  }

}
