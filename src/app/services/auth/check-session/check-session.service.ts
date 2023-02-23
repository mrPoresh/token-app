import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { CheckSessionResponse } from './check-session.models';
import { BaseHttpService, USER_INFO_SESSION } from '../../http/base-http.service';
import {CookieService } from 'ngx-cookie-service';
import { LoginStatusService } from '../login/login-status.service';
import { UserInfo, LoggedStatus } from '../auth.models';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService extends BaseHttpService {


  constructor(http: HttpClient, cookie: CookieService, private loginStatusService: LoginStatusService, public formBuilder: FormBuilder) {
    super(http,cookie);
  }

  public requestCheckSession () {
    const token = this.cookie.get('session');
    if (token) {
      console.log('token exist', token)
      return this.getRequest<UserInfo>(USER_INFO_SESSION, undefined, token).pipe(
        map((res) => {
          this.loginStatusService.updateUserInfo({
            isLogged: LoggedStatus.logged,
            username: res.username,
            wallets: res.wallets
          });
        }),
        switchMap(() => this.loginStatusService.getLoginStatus()),
        catchError((err) => {
          this.loginStatusService.updateUserInfo({isLogged: LoggedStatus.notLogged});
          return this.loginStatusService.getLoginStatus();
        })
      );
    } else {
      console.log('token dont exist');
      this.loginStatusService.updateUserInfo({isLogged: LoggedStatus.notLogged});
      return this.loginStatusService.getLoginStatus();
    }
  }
}
