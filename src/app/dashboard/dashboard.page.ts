import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  async ngOnInit() {
    let user =  await this.auth.getUser();
    console.table(user);
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

}
