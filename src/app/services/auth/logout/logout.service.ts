import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs';
import { LOGOUT_USER } from '../../http/base-http.service';
import { BaseUsermgrService } from '../../http/base-usermgr.service';
import { LoginProviderService } from '../../provider/login-provider.service';
import { CheckSessionService } from '../check-session/check-session.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService extends BaseUsermgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private checkSessionService: CheckSessionService,
    private loginProviderService: LoginProviderService,
    private formBuilder: FormBuilder,
  ) { 
    super(http, cookie) 
  }

  logOut() {
    let token = this.cookie.get("session");
    this.cookie.delete("session");
    let tokenForm = this.formBuilder.group({token: token});

    return this.postRequest<string>(LOGOUT_USER, tokenForm).pipe(
      switchMap((res) => {
        this.loginProviderService.logOut();
        return this.checkSessionService.requestCheckSession()
      })
    )

  }
}
