import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedMaterialModule } from './modules/shared-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base-components/base/base.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { SignupStepOneComponent } from './components/auth/signup/signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './components/auth/signup/signup-step-two/signup-step-two.component';
import { SignupStepThreeComponent } from './components/auth/signup/signup-step-three/signup-step-three.component';
import { LoaderComponent } from './components/base-components/loader/loader.component';
import { WalletSlideComponent } from './components/slide-menu/wallet-slide/wallet-slide.component';
import { UserSlideComponent } from './components/user-slide/user-slide.component';
import { LoginStatusService } from './services/auth/login/login-status.service';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasePageComponent,
    SlideMenuComponent,
    FrontPageComponent,
    LoginComponent,
    SignupFormComponent,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    SignupStepThreeComponent,
    LoaderComponent,
    WalletSlideComponent,
    UserSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    HttpClientModule
  ],
  providers: [
    LoginStatusService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
