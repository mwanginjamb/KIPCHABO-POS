import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Storage } from '@ionic/storage';


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

      let userData = JSON.stringify(user);
      return await this.storage.set('user', userData);
  }

  async logout() {
      return await this.storage.remove('user');
  }

  async getUser() {
      
  let user = await this.storage.get('user');
  return JSON.parse(user);

  }

  public fetchEmployee(No:string) {
    return this.http.get(`${this.url}site/employee?No=${No}`);
  }

  public async setEmployee(Employee) {
    let employee = JSON.stringify(Employee);
    return await this.storage.set('Employee', employee);
  }

  public async getEmployee() {
    let employee =  await this.storage.get('Employee');
    return JSON.parse(employee);
  }
}
