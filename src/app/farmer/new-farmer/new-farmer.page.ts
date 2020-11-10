import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { Farmer } from "src/app/models/farmer.model";
import { FarmerService } from "../farmer.service";

@Component({
  selector: "app-new-farmer",
  templateUrl: "./new-farmer.page.html",
  styleUrls: ["./new-farmer.page.scss"],
})
export class NewFarmerPage implements OnInit {
  farmer: Farmer = new Farmer();
  farmerSub: Subscription;
  shadesSub: Subscription;
  routesSub: Subscription;
  tearoutes: any;

  shades: any;

  teaTypes = [
    { type: "GREEN", name: "GREEN" },
    { type: "PURPLE", name: "PURPLE" },
  ];

  constructor(
    private popoverCtrl: PopoverController,
    private farmerService: FarmerService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchRoutes();
    // this.fetchShades(); // Buying Centers
    this.popoverCtrl.dismiss();
  }

  onAddFarmer() {

    const RegDate = this.farmer.Inspection_Date.split('T')[0];
    const FormattedDate = this.farmerService.formatDate(RegDate);

    this.farmer.Inspection_Date = FormattedDate;
    this.farmerSub = this.farmerService
      .createFarmer(this.farmer)
      .subscribe((res) => {
        if (typeof res !== "string") {
          // Show a Toast Notification
          this.toastCtrl
            .create({
              message: `${res.Application_No} Farmer Added Successfully.`,
              duration: 2000,
              position: "top",
            })
            .then((toastData) => {
              toastData.present();
              this.router.navigate(["/", "farmer", res.Application_No]);
            });
        } else {
          this.alertCtrl
            .create({
              header: "Operation Error",
              message: "Message : " + res,
              buttons: [{ text: "Okay" }],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      });
  }

  fetchShades(RouteNo) {
    this.shadesSub = this.farmerService.Shades(RouteNo).subscribe((shades) => {
      this.shades = shades;
    });
  }

  fetchRoutes() {
    this.routesSub = this.farmerService.Routes.subscribe((routes) => {
      this.tearoutes = routes;
    });
  }

  
}
