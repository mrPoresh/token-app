import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GET_PRICE_CONVERSION, TRADE_WITH_MASTER } from '../http/base-http.service';
import { BaseWalletsmgrService } from '../http/base-walletsmgr.service';
import { PriceConversionResponse, TradeWithMasterResponse } from './trade.models';

@Injectable({
  providedIn: 'root'
})
export class TradeService extends BaseWalletsmgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private formBuilder: FormBuilder,
  ) { 
    super(http, cookie) 
  }
  /* errors Handling? */
  getPriceConversion(conversionForm: FormGroup) {
    return super.postRequest<PriceConversionResponse>(GET_PRICE_CONVERSION, conversionForm);
  }

  tradeWithMaster(tradeForm: FormGroup) {
    return super.postRequest<TradeWithMasterResponse>(TRADE_WITH_MASTER, tradeForm);
  }

}
