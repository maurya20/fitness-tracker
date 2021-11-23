import { IAuthData } from '../models/auth-data.model';
import { IUser } from '../models/user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable()
export class AuthService {
  private user: IUser;
  authChange = new Subject<boolean>();
  isAuth: boolean;
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  registerUser(authData: IAuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('resultwa>>>>>', result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log('erroooooorrrr', error);
      });
  }
  login(authData: IAuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('resultwa>>>>>', result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log('erroooooorrrr', error);
      });
  }
  logout() {
    this.isAuth = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.isAuth;
  }
  authSuccessfully() {
    this.isAuth = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
