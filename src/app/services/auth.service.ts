import { IAuthData } from '../models/auth-data.model';
import { IUser } from '../models/user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from './exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from './ui.service';

@Injectable()
export class AuthService {
  private user: IUser;
  authChange = new Subject<boolean>();
  isAuth: boolean;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private exersiceService: ExerciseService,
    private snackBar: MatSnackBar,
    private uiService: UiService
  ) {}
  registerUser(authData: IAuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('resultwa>>>>>', result);
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.uiService.showSnackBar(error.message, null, 4000);
        this.uiService.loadingStateChange.next(false);
      });
  }
  login(authData: IAuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('resultwa>>>>>', result);
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.uiService.showSnackBar(error.message, null, 4000);
        this.uiService.loadingStateChange.next(false);
      });
  }
  logout() {
    this.exersiceService.cancelSubscriptions();
    this.isAuth = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.isAuth;
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exersiceService.cancelSubscriptions();
        this.isAuth = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
