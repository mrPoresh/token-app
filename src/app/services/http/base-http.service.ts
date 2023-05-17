import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

export const LOGIN_EMAIL_URL: string = "/umg/signin";
export const SIGNUP_URL: string = "/umg/signup";
export const USER_INFO_SESSION: string = "/umg/info";
export const LOGOUT_USER: string = "/umg/logout";

export const CREATE_WALLET: string = "/wallet/addwallet";
export const CREATE_ACCOUNT: string = "/wallet/addacc";

export const GET_FRONT_PAGE: string = '/nfts/getFrontPageData';
export const GET_FRONT_LISTS: string = '/nfts/getFrontListsData';
export const GET_FRONT_TABS_VOLUME: string = '/nfts/getFrontTabsByVolume';
export const GET_FRONT_TABS_MINT: string = '/nfts/getFrontTabsByMints';

export const GET_PRICE_CONVERSION: string = '/trade/getPriceConversion';
export const TRADE_WITH_MASTER: string = '/trade/tradeWithMaster';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  apiUrl: string

  constructor(
    protected http: HttpClient,
    protected cookie: CookieService
  ) { 
    this.apiUrl = environment.apiUrl;
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  createHeaders(headers: { [name: string]: string | string[] } = {}): HttpHeaders {
    const newHeaders = {};
    Object.assign(newHeaders, headers);

    const authToken = this.cookie.get('session');
    
    newHeaders['Authorization'] = 'Bearer ' + authToken;
    newHeaders['Content-Type'] = 'application/json';
    //newHeaders['Access-Control-Allow-Origin'] = '*';

    return new HttpHeaders(newHeaders);
  }

  protected postRequest<T>(url: string, formGroup: FormGroup) {
    return this.http.post<T>(this.apiUrl + url, { params: formGroup.value });
  }

  protected getRequest<T>(url: string, formGroup?: FormGroup) {
    return this.http.get<T>(this.apiUrl + url, { params: formGroup?.value });
  }

  protected get<T>(url: string) {
    return this.http.get<T>(this.apiUrl + url);
  }

  /* later add error handling */
  
}
