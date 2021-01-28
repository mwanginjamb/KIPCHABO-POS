import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Storage } from '@ionic/storage';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;

  constructor(private http: HttpClient, private storage: Storage) { }

  authenticate(username: string, password: string) {
    const auth = {Password: password, Username: username};
    return this.http.post<User>(`${this.url}site/auth`,JSON.stringify(auth));
  }

  async login(user: User) {
      return await this.storage.set('user', user);
  }

  async logout() {
      return await this.storage.remove('user');
  }

  async getUser() {
      
  let  user: User;
  user = await this.storage.get('user');
  return user;
  }
}
