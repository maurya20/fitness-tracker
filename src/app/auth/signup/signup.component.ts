import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading: boolean = false;
  private loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChange.subscribe((state) => {
      this.isLoading = state;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  submitForm(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
}
