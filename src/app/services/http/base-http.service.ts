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

export const GET_FRONT_LIST: string = '/nfts/getfrontpagelists';

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

  createHeaders(token?: string) {
    console.log(token)
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    });
    return headers
  }

  public postRequest<T>(url: string, formGroup: FormGroup/* , token?: string */) {
    //let headers = this.createHeaders(token);
    return this.http.post<T>(this.apiUrl + url, { params: formGroup.value });
  }

  public getRequest<T>(url: string, formGroup?: FormGroup/* , token?: string */) {
    //headers = this.createHeaders(token);
    return this.http.get<T>(this.apiUrl + url, { params: formGroup?.value });
  }
  
}
