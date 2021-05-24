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
    return this.http.post<User>(`${this.url}/site/auth`, JSON.stringify(auth));
  }

  async login(user: User) {

      const userData = JSON.stringify(user);
      return await this.storage.set('user', userData);
  }

  async logout() {
       await this.storage.remove('user');
       await this.storage.remove('Employee');
       await this.authenticated(false);
       
  }

  async getUser() {
  const user = await this.storage.get('user');
  return JSON.parse(user);

  }

  public fetchEmployee(No: string) {
    return this.http.get(`${this.url}site/employee?No=${No}`);
  }

  public async setEmployee(Employee) {
    const employee = JSON.stringify(Employee);
    return await this.storage.set('Employee', employee);
  }

  public async getEmployee() {
    const employee =  await this.storage.get('Employee');
    return JSON.parse(employee);
  }

  public async authenticated(status: boolean) {
    return await this.storage.set('Authenticated', status);
  }

  async isAuthenticated() {
    return await this.storage.get('Authenticated');
  }
}
