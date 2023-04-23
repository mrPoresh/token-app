import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { BaseHttpService, USER_INFO_SESSION } from '../../http/base-http.service';
import {CookieService } from 'ngx-cookie-service';
import { UserInfo, LoggedStatus } from '../auth.models';
import { FormBuilder } from '@angular/forms';
import { BaseUsermgrService } from '../../http/base-usermgr.service';
import { LoginStatusService } from '../status/login-status.service';
import { LoginProviderService } from '../../provider/login-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService extends BaseUsermgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService, 
    private loginStatusService: LoginStatusService, 
    private loginProviderService: LoginProviderService,
    public formBuilder: FormBuilder) {
    super(http,cookie);
  }

  public requestCheckSession (): Observable<UserInfo> {
    return super.get<UserInfo>(USER_INFO_SESSION).pipe(
      switchMap((res) => {this.loginStatusService.updateUserInfo({
          isLogged: LoggedStatus.logged,
          user: res
        });

        return this.loginStatusService.getLoginStatus();
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.loginStatusService.updateUserInfo({isLogged: LoggedStatus.notLogged, user: undefined});
        }
        
        return this.loginStatusService.getLoginStatus();
      })
    );
  }

  public requestCheckProviderSession (): Observable<UserInfo> {
    this.loginProviderService.createConnector();
    return this.loginProviderService.getConnection().pipe(
      switchMap((res: any) => {
        this.loginStatusService.updateUserInfo({
          isProvider: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
          provider: res.status === "connected" ? res.connection : undefined, // res.connection.address : undefined,
        });

        if (res.status === "connected") {
          this.loginProviderService.initSDKwithProvider(res.connection.wallet);
        } else if (res.status === "disconnected") {
          this.loginProviderService.initSDKwiithOutProvider();
        }

        return this.loginStatusService.getLoginStatus(); 
      })
    );
  }
  
}
