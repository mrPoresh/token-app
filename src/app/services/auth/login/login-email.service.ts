import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, switchMap } from 'rxjs';

import { BaseHttpService, LOGIN_EMAIL_URL } from '../../http/base-http.service';
import { LoginEmailResponse, UserInfo } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class LoginEmailService extends BaseHttpService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
  ) { 
    super(http, cookie) 
  }

    requestLoginUser(loginForm: FormGroup) {
        return super.postRequest<LoginEmailResponse>(LOGIN_EMAIL_URL, loginForm)
            .pipe(
                map((loginResp) => {
                    this.cookie.set("session", loginResp.data.token);
                    console.log('token', loginResp.data.token);
                    return loginResp;
                }),
            );
    }

}
