import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CREATE_ACCOUNT, CREATE_WALLET } from '../http/base-http.service';
import { BaseWalletsmgrService } from '../http/base-walletsmgr.service';
import { CreateWalletResponse } from './wallets.models';

@Injectable({
  providedIn: 'root'
})
export class WalletsService extends BaseWalletsmgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private formBuilder: FormBuilder,
  ) { 
    super(http, cookie) 
  }
  /* errors Handling? */
  createWallet(walletForm: FormGroup) {
    return super.postRequest<CreateWalletResponse>(CREATE_WALLET, walletForm);
  }

  createAccount(accountForm: FormGroup) { /* returns OK */
    return super.postRequest<string>(CREATE_ACCOUNT, accountForm);
  }
}
