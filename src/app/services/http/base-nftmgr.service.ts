import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseNftmgrService extends BaseHttpService {

  constructor(http: HttpClient, protected cookie: CookieService) { 
    super(http, cookie)
  }

  private extendHeaders() {

  }

  protected postRequest<T>(url: string, formGroup: FormGroup) {
    const httpOptionsDefault = {
      headers: this.createHeaders(),  /* this.extendHeaders() */
      withCredentials: true
    };
    
    const params = formGroup.value

    return this.http.post<T>(this.apiUrl + url, params, { ...httpOptionsDefault });

  }

  protected get<T>(url: string) {
    const httpOptionsDefault = {
      headers: this.createHeaders(),  /* this.extendHeaders() */
      //withCredentials: true
    };

    return this.http.get<T>(this.apiUrl + url, { ...httpOptionsDefault })

  }
}
