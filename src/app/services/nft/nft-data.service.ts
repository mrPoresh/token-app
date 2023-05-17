import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GET_FRONT_LISTS, GET_FRONT_PAGE, GET_FRONT_TABS_MINT, GET_FRONT_TABS_VOLUME } from '../http/base-http.service';
import { BaseNftmgrService } from '../http/base-nftmgr.service';
import { GetFrontPageDataResponce } from './nft-data.models';

@Injectable({
  providedIn: 'root'
})
export class NftDataService extends BaseNftmgrService {

  constructor(
    http: HttpClient, 
    cookie: CookieService,
    private formBuilder: FormBuilder,
  ) { 
    super(http, cookie) 
  }
//
  getFrontPageData() {
    return super.get<GetFrontPageDataResponce>(GET_FRONT_PAGE)
  }

  getFrontPageListsData(form: FormGroup) {
    return super.postRequest(GET_FRONT_LISTS, form)
  }

  getFrontTabsByVolume(form: FormGroup) {
    return super.postRequest(GET_FRONT_TABS_VOLUME, form)
  }

  getFrontTabsByMints(form: FormGroup) {
    return super.postRequest(GET_FRONT_TABS_MINT, form)
  }
}
