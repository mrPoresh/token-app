import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UserSlideComponent } from './components/slide-menu/user-slide/user-slide.component';
import { LoginStatusService } from './services/auth/login/login-status.service';
import { AuthInterceptor } from './interceptors/auth-Interceptor-http.interceptor';
import { PromotedComponent } from './components/front-page/promoted/promoted.component';
import { TopListComponent } from './components/front-page/top-list/top-list.component';
import { CardComponent } from './components/base-components/card/card.component';
import { HeaderComponent } from './components/base-components/header/header.component';


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
    PromotedComponent,
    TopListComponent,
    CardComponent,
    HeaderComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
