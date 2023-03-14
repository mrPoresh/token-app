import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { CreateWalletResponse, UserInfo } from '../auth/auth.models';
import { CheckSessionService } from '../auth/check-session/check-session.service';
import { BaseHttpService, CREATE_WALLET } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseWalletService extends BaseHttpService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private checkSessionService: CheckSessionService,

  ) { 
    super(http, cookie) 
  }

  public createWallet(formGroup: FormGroup) {
    return this.postRequest<CreateWalletResponse>(CREATE_WALLET, formGroup).pipe(
      map((res) => {
        this.checkSessionService.requestCheckSession();
        return res.data.mnemonic
      })
    );
  }

}
