import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Requisition } from '../requisition.model';
import { NgForm } from '@angular/forms';
import { RequisitionService } from '../requisition.service';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location.model';

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

  constructor( private popoverCtrl: PopoverController, private requisitionService: RequisitionService) { }

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
    console.log('This requisition');
    console.log(this.requisition);
    this.requisitionPostSub = this.requisitionService.postRequisition(this.requisition).subscribe(res => {
      console.log(res);
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
