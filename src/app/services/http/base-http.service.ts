import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

export const LOGIN_EMAIL_URL: string = "/umg/signin";
export const CHECK_SESSION: string = "/user/check-session/";
export const USER_INFO_SESSION: string = "/umg/info"
export const USER_FULL_DETAILS: string = "/user/details/?with_payment=1"

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
    console.log('api Url');
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

/*   createHeaders(headers: {[name: string]: string | string[]; } = {} ): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    });
    console.log('heders', headers)
    return headers
  } */

/*   public get<T>(url: string) {
    const headers = this.createHeaders()
    return this.http.get<T>(this.apiUrl + url);
  } */

  createHeaders(token?: string) {
    console.log(token)
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
/*     if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    } */
    return headers
  }

  public postRequest<T>(url: string, formGroup: FormGroup, token?: string) {
    let headers = this.createHeaders(token);
    return this.http.post<T>(this.apiUrl + url, { headers: headers, params: formGroup.value });
  }

  public getRequest<T>(url: string, formGroup?: FormGroup, token?: string) {
  let headers = this.createHeaders(token);
    return this.http.get<T>(this.apiUrl + url, { headers: headers, params: formGroup?.value });
  }
  
}
