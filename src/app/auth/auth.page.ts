import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth-service';
import { User } from './user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  authSub: Subscription;
  failed = false;
  

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  

  onSubmit(form: NgForm) {

    if(!form.valid){
      return;
    }
    
    const username = form.value.username;
    const password = form.value.password;

    this.authSub = this.auth.authenticate(username, password).subscribe(result => {
        if(result.Key) {
         
          // redirect to dashboard and store user data in local storage
          this.auth.login(result); 
          return this.router.navigate(['./dashboard']);
        }else{
          this.failed = true;
        }
    }, error => {
      console.log(error.error);
      this.failed = true;
    });

    
  }

}
