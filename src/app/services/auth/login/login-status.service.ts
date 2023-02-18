import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

import { LoggedStatus, UserInfo } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  private userInfo = new BehaviorSubject<UserInfo>({
    isLogged: LoggedStatus.voidState,
  });

  constructor() { }

  public getLoginStatus(): Observable<UserInfo> {
    return this.userInfo.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  public updateUserInfo(params: any) {
    let current = this.userInfo.getValue();
    this.userInfo.next({ ...current, ...params });
  }
}
