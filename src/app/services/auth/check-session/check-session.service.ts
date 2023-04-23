import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { BaseHttpService, USER_INFO_SESSION } from '../../http/base-http.service';
import {CookieService } from 'ngx-cookie-service';
import { LoginStatusService } from '../login/login-status.service';
import { UserInfo, LoggedStatus } from '../auth.models';
import { FormBuilder } from '@angular/forms';
import { LoginWalletProviderService } from '../../web3-providers/login-wallet-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService extends BaseHttpService {


  constructor(
    http: HttpClient, 
    cookie: CookieService, 
    private loginStatusService: LoginStatusService, 
    private loginWalletService: LoginWalletProviderService, 
    public formBuilder: FormBuilder) {
    super(http,cookie);
  }

  public requestCheckSession () {
    const token = this.cookie.get('session');
    this.loginWalletService.createConnector();
    
    if (token) {
      return this.getRequest<UserInfo>(USER_INFO_SESSION, undefined).pipe(
        map((res) => {
          this.loginStatusService.updateUserInfo({
            isLogged: LoggedStatus.logged,
            user: res
          });
        }),
        map(() => {
          this.loginWalletService.getConnection().pipe(
            map((res: any) => {
              this.loginStatusService.updateUserInfo({
                isProvider: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
                provider: res.status === "connected" ? res.connection : undefined, /* res.connection.address : undefined, */
              });

              if (res.status === "connected") {
                this.loginWalletService.initSDKwithProvider(res.connection.wallet);
              } else {
                this.loginWalletService.initSDKwiithOutProvider();
              }
            })
          );
        }),
        switchMap(() => this.loginStatusService.getLoginStatus()),
        catchError((err) => {
          this.loginStatusService.updateUserInfo({isLogged: LoggedStatus.notLogged});
          this.loginWalletService.initSDKwiithOutProvider();
          return this.loginStatusService.getLoginStatus();
        })
      );
    } else {
      this.loginStatusService.updateUserInfo({isLogged: LoggedStatus.notLogged});
      this.loginWalletService.initSDKwiithOutProvider();
      return this.loginStatusService.getLoginStatus();
    }
  }
}
