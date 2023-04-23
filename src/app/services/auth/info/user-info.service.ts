import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable, switchMap } from 'rxjs';
import { USER_INFO_SESSION } from '../../http/base-http.service';
import { BaseUsermgrService } from '../../http/base-usermgr.service';
import { LoggedStatus, UserInfo } from '../auth.models';
import { LoginStatusService } from '../status/login-status.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService extends BaseUsermgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private loginStatusService: LoginStatusService,
  ) { 
    super(http, cookie) 
  }

  requestCheckUserInfo(): Observable<UserInfo> {
    return super.get<UserInfo>(USER_INFO_SESSION).pipe(
      switchMap((res) => {
        this.loginStatusService.updateUserInfo({
          isLogged: LoggedStatus.logged,
          user: res
        });

        return this.loginStatusService.getLoginStatus();
      })
    );
  }
}
