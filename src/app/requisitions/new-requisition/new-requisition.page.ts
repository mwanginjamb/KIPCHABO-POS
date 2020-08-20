import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, AlertController } from '@ionic/angular';
import { Requisition } from '../requisition.model';
import { NgForm } from '@angular/forms';
import { RequisitionService } from '../requisition.service';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-requisition',
  templateUrl: './new-requisition.page.html',
  styleUrls: ['./new-requisition.page.scss'],
})
export class NewRequisitionPage implements OnInit {

  requisition: Requisition = new Requisition();
  requisitionSub: Subscription;
  locationSub: Subscription;
  dimensionSub: Subscription;
  requisitionPostSub: Subscription;
  locations: Location;
  dimensions: any;
  departments: any;
  projects: any;

  constructor( 
    private popoverCtrl: PopoverController,
    private requisitionService: RequisitionService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.popoverCtrl.dismiss();
    this.Requisition();
    this.fetchLocations();
    this.fetchDimensions();
    this.fetchDepartments();
    this.fetchProjects();

  }

  Requisition() {
    this.requisitionSub = this.requisitionService.createRequisition().subscribe(result => {
      Object.assign(this.requisition, result);
      this.requisition.In_Transit_Code = 'IN-TRANSIT';
    });
  }

  onRequisitionupdate(form: NgForm) {
    this.requisitionPostSub = this.requisitionService.postRequisition(this.requisition).subscribe(res => {
      if ( typeof res !== 'string' ) {
        // Show a Toast Notification
        this.toastCtrl.create({
          message: `${res.No} Requisition Added Successfully.`,
          duration: 2000,
          position: 'top'
        }).then((toastData) => {
          toastData.present();
          this.router.navigate(['/', 'requisitions', res.No]);
        });
      } else {
        this.alertCtrl.create({
          header: 'Operation Error',
          message: 'Message : ' + res,
          buttons: [{ text: 'Okay' }]
        }).then( alertEl => {
          alertEl.present();
        });
      }
    }, error => {
      console.log(error.error);
      this.alertCtrl.create({
        header: 'Service Error!',
        message: 'Connection problem: ' + error ,
        buttons: [{ text: 'Okay' }]
      })
      .then(alertEl => {
        alertEl.present();
      });
    });
  }

  fetchLocations() {
    this.locationSub = this.requisitionService.getLocations().subscribe( res => {
      console.log('Locations');
      console.log(res);
      this.locations = res;
    });
  }

  fetchDimensions() {
    this.dimensionSub = this.requisitionService.Dimensions.subscribe( dim => {
      console.log('dimensions'); console.log(dim);
      this.dimensions = dim;
    });
  }

  fetchDepartments() {
    this.dimensionSub = this.requisitionService.Departments.subscribe( dim => {
      console.log('Department'); console.log(dim);
      this.departments = dim;
    });
  }

  fetchProjects() {
    this.dimensionSub = this.requisitionService.Projects.subscribe( dim => {
      console.log('Projects'); console.log(dim);
      this.projects = dim;
    });
  }


}
