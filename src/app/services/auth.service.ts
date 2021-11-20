import { IAuthData } from '../models/auth-data.model';
import { IUser } from '../models/user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: IUser;
  authChange = new Subject<boolean>();
  constructor(private router: Router) {}
  registerUser(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }
  login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return { ...this.user };
  }
  isAuthenticated() {
    return this.user != null;
  }
  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
