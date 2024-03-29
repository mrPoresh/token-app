import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable } from 'rxjs';
import { SIGNUP_URL } from '../../http/base-http.service';
import { BaseUsermgrService } from '../../http/base-usermgr.service';
import { RegistrationResponse } from '../auth.models';
import { CheckSessionService } from '../check-session/check-session.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseUsermgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private checkSessionService: CheckSessionService,

  ) { 
    super(http, cookie) 
  }

  public postRegistration(registrationForm: FormGroup): Observable<string> {
    return super.postRequest<RegistrationResponse>(SIGNUP_URL, registrationForm).pipe(
      map((res) => {
        this.cookie.set("session", res.data.token);
        this.checkSessionService.requestCheckSession();
        return res.data.mnemonic
      }),
      catchError((err) => {
        console.log('err', err);
        return 'error' /////////////// !!!!!!!!!!!!!!!
      })
    );
  }

}
