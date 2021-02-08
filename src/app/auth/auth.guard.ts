import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService, private router: Router) {

  }

   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.isAuthenticated()) {
      return this.router.navigateByUrl('/auth');
    }

    return this.auth.isAuthenticated();
  }


}
