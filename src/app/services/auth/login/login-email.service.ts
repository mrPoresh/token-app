import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, switchMap } from 'rxjs';

import { BaseHttpService, LOGIN_EMAIL_URL } from '../../http/base-http.service';
import { LoginEmailResponse, UserInfo } from '../auth.models';
import { CheckSessionService } from '../check-session/check-session.service';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root'
})
export class LoginEmailService extends BaseHttpService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private checkSessionService: CheckSessionService,
  ) { 
    super(http, cookie) 
  }

  requestLoginUser(loginForm: FormGroup) {
    return this.postRequest<LoginEmailResponse>(LOGIN_EMAIL_URL, loginForm).pipe(
      map((res) => {
        console.log('comrad our key is', res)
        this.cookie.set("session", res.data.token);
      }),
      switchMap((res) => this.checkSessionService.requestCheckSession()),
      catchError((err) => {
        console.log('incorrect data maybe')
        return this.checkSessionService.requestCheckSession()
      })
    );
  }

}
