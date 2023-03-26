import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BaseHttpService, GET_FRONT_LIST } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataNftService extends BaseHttpService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
  ) { 
    super(http, cookie) 
  }

  public getFrontPageLists(formGroup: FormGroup) {
    console.log(formGroup.value)
    return this.postRequest<any>(GET_FRONT_LIST, formGroup)
  }
}