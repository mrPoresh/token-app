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


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasePageComponent,
    SlideMenuComponent,
    FrontPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
