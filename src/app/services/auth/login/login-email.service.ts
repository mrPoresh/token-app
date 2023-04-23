import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, switchMap } from 'rxjs';

import { LOGIN_EMAIL_URL, LOGOUT_USER } from '../../http/base-http.service';
import { BaseUsermgrService } from '../../http/base-usermgr.service';
import { LoginEmailResponse, UserInfo } from '../auth.models';
import { CheckSessionService } from '../check-session/check-session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginEmailService extends BaseUsermgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private checkSessionService: CheckSessionService,
    private formBuilder: FormBuilder,
  ) { 
    super(http, cookie) 
  }

  requestLoginUser(loginForm: FormGroup) {
    return super.postRequest<LoginEmailResponse>(LOGIN_EMAIL_URL, loginForm).pipe(
      switchMap((res) => {
        this.cookie.set("session", res.data.token);
        return this.checkSessionService.requestCheckSession();
      }),
      catchError((err) => {
        console.log('incorrect data maybe')
        return this.checkSessionService.requestCheckSession()
      })
    );
  }

  logOut() {  /* rebuild */
    let token = this.cookie.get("session");
    this.cookie.delete("session");
    let tokenForm = this.formBuilder.group({token: token});
    return super.postRequest(LOGOUT_USER, tokenForm)
  }

}
