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
    console.log('req for roken')
    if (token) {
      console.log('token exist', token)
      return this.getRequest<UserInfo>(USER_INFO_SESSION, undefined).pipe(
        map((res) => {
          console.log(res);
          this.loginStatusService.updateUserInfo({
            isLogged: LoggedStatus.logged,
            user: res
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
