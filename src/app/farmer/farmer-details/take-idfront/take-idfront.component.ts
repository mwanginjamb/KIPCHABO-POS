import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// for web integration
import '@capacitor-community/camera-preview';

@Component({
  selector: 'app-take-idfront',
  templateUrl: './take-idfront.component.html',
  styleUrls: ['./take-idfront.component.scss'],
})
export class TakeIdfrontComponent implements OnInit {

  @Input() FarmerID: string;
  image = null;
  cameraActive = false;
  imagePayload = {
    farmerId: null,
    ImageBinary: null,
    MediaType: null
  };

  url = environment.url;

  constructor(private modalCtrl: ModalController, private http: HttpClient, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.openCamera();
    this.popoverCtrl.dismiss();
    console.log(this.cameraActive);
  }

  openCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraPreview',
      className: 'cameraPreview',
    };

    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;

  }

  async stopCamera() {
    await CameraPreview.stop();
    this.cameraActive = false;
    this.modalCtrl.dismiss();
  }

 async captureImage() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 90
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    // Send Image to server using http module @Todo
    this.imagePayload.farmerId = this.FarmerID;
    this.imagePayload.ImageBinary = result.value;
    this.imagePayload.MediaType = 'IDFRONT';

    this.http.post(this.url + 'site/add-media', JSON.stringify(this.imagePayload)).subscribe(res => {
      console.log(res);
    });


    this.stopCamera();
  }

  flipCamera() {
    CameraPreview.flip();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
