import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CurrentComponent } from './training/current/current.component';
import { PastComponent } from './training/past/past.component';
import { NewComponent } from './training/new/new.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TrainingComponent } from './training/training.component';
import { StopTrainingComponent } from './training/current/stop-training-component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CurrentComponent,
    PastComponent,
    NewComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
