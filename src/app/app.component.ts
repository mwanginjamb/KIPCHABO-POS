import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe( () => this.showSplash = false );

    });
  }


  logout() {
    console.log('You just logged me out!!');
    // Exit the App
    if (window.confirm(`Do you want to exit the app?`)) {
      navigator['app'].exitApp();
    }
  }

  showDailySales(){
    return this.router.navigate(['./postedsales/dailyreport']);
  }

  showMonthlySales(){
    return this.router.navigate(['./postedsales/monthlyreport']);
  }

  showDailyReceipts(){
    return this.router.navigate(['./payments/daily-report']);
  }

  showMonthlyReceipts(){
    return this.router.navigate(['./payments/monthly-report']);
  }

  showAvailability(){
    return this.router.navigate(['./items/availability']);
  }

}
