import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from './auth-service';
import { User } from './user';

import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  authSub: Subscription;
  empSub: Subscription;
  failed = false;
  authenticated: boolean;
  user: User;
  loading: HTMLIonLoadingElement;

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private storage: Storage
    ) { }

  ngOnInit() {

  }

  async onSubmit(form: NgForm) {

    // Show the loading indicator
    await this.presentLoading();

    if (!form.valid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.authSub = this.auth.authenticate(username, password)
    .pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
    )
    .subscribe( async (result) => {
        if (result.Key) {
          // redirect to dashboard and store user data in local storage
          this.auth.login(result);
          this.user = result;
          this.Employee();
          await this.auth.authenticated(true);
          return this.router.navigate(['./dashboard']);
        }else{
          this.failed = true;
        }
    }, error => {
      console.log(error.error);
      this.failed = true;
    });
  }

   Employee() {
    console.log(this.user);
    this.empSub = this.auth.fetchEmployee(this.user.Employee_No).subscribe( async (res) => {
       await this.auth.setEmployee(res);
    }, error => {
      console.log(error.error);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots',
      animated: true,
      message: 'Authenticating',
    });

    // present the controller
    await this.loading.present();
  }

}
