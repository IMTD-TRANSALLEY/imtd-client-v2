import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';

const BACKEND_URL = `${environment.apiURL}/users`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = null;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private user: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http
      .post<any>(`${BACKEND_URL}/login`, {
        email,
        password,
      })
      .subscribe(
        (response) => {
          // TODO: Clean
          console.log('login success');
          console.log(response);
          this.token = response.token;
          if (this.token) {
            this.user = response.data.user;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.router.navigate(['/admin']);
          }
        },
        (error) => {
          // TODO: Clean
          console.log('login error');
          console.log(error);
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.token;
  }

  getUser() {
    return this.user;
  }
}
