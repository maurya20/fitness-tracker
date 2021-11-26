import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map((state) => state.ui.isLoading));
    // this.loadingSubs = this.uiService.loadingStateChange.subscribe((state) => {
    //   this.isLoading = state;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
    console.log('/////>>>', this.loginForm);
  }
  // ngOnDestroy(): void {
  //   this.loadingSubs.unsubscribe();
  // }
}
