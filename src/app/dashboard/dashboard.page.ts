import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  username = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
   this.fetchUsername();
  }

  ionViewWillEnter() {
    this.fetchUsername();
  }

  ionViewDidEnter() {
    this.fetchUsername();
  }

  async fetchUsername() {
    const employee = await this.auth.getEmployee();
    if (typeof employee === 'object' && employee.First_Name && employee.Last_Name) {
        this.username = `${employee.First_Name} ${employee.Last_Name}`;
    }
  }

  showDaily(){
    return this.router.navigate(['./postedsales/dailyreport']);
  }

  showMonthly(){
    return this.router.navigate(['./postedsales/monthlyreport']);
  }

  showDailyPayments(){
    return this.router.navigate(['./payments/daily-report']);
  }

  showMonthlyPayments(){
    return this.router.navigate(['./payments/monthly-report']);
  }

  showAvailability(){
    return this.router.navigate(['./items/availability']);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['./auth']);
  }

}
