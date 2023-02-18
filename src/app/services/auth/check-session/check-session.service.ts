import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, share, switchMap } from 'rxjs/operators';
import { CheckSessionResponse } from './check-session.models';
import { BaseHttpService, CHECK_SESSION } from '../../http/base-http.service';
import {CookieService } from 'ngx-cookie-service';
import { LoginStatusService } from '../login/login-status.service';
import { UserInfo, LoggedStatus } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService extends BaseHttpService {


  constructor(http:HttpClient,cookie:CookieService,private loginStatusService:LoginStatusService) {
    super(http,cookie);
  }

/*   public requestCheckSession (): Observable<UserInfo> {
    return this.get<string>(CHECK_SESSION).pipe(
      switchMap((resp) => {
        this.loginStatusService.updateUserInfo({
          isLogged: resp === "OK" ? LoggedStatus.logged : LoggedStatus.notLogged,
        });
        return this.loginStatusService.getLoginStatus();
      }),
      catchError((error: HttpErrorResponse) =>{
        if (error.status===403){
          this.loginStatusService.updateUserInfo({
            isLogged:  LoggedStatus.notLogged,
          });
        }
        // return an observable with a user-facing error message
        return this.loginStatusService.getLoginStatus();
      })
    );
  } */
}
