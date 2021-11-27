import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { IAuthData } from '../models/auth-data.model';
import { UiService } from '../shared/ui.service';
import { ExerciseService } from '../services/exercise.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { Store } from '@ngrx/store';
import * as Auth from './auth.actions';
@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private exerciseService: ExerciseService,
    private uiService: UiService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.store.dispatch(new UI.StartLoading());
    //this.uiService.loadingStateChange.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        //this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        ///this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: IAuthData) {
    this.store.dispatch(new UI.StartLoading());
    ///this.uiService.loadingStateChange.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        console.log('resp ofter login>>>>>>>', result?.user?.email);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(error.message, null, 4000);
      });
  }

  logout() {
    this.afAuth.signOut();
  }
}
