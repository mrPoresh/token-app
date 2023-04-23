import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BaseHttpService, GET_FRONT_LISTS, GET_FRONT_PAGE, GET_FRONT_TABS_MINT, GET_FRONT_TABS_VOLUME } from './base-http.service';

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

  public getFrontPageData() {
    return this.getRequest<any>(GET_FRONT_PAGE)
  }

  public getFrontPageListsData(form: FormGroup) {
    return this.postRequest<any>(GET_FRONT_LISTS, form)
  }

  public getFrontTabsByVolume(form: FormGroup) {
    return this.postRequest<any>(GET_FRONT_TABS_VOLUME, form)
  }

  public getFrontTabsByMints(form: FormGroup) {
    return this.postRequest<any>(GET_FRONT_TABS_MINT, form)
  }
}
