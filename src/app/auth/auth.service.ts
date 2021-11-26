import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { IAuthData } from '../models/auth-data.model';
import { UiService } from '../shared/ui.service';
import { ExerciseService } from '../services/exercise.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.store.dispatch({ type: 'START_LOADING' });
    //this.uiService.loadingStateChange.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        //this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        ///this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: IAuthData) {
    this.store.dispatch({ type: 'START_LOADING' });
    ///this.uiService.loadingStateChange.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        //this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
