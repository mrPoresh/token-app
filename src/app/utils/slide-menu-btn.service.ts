import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideMenuBtnService {

  private $menuStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  getMenuStatus(): Observable<boolean> {
    return this.$menuStatus.asObservable().pipe(distinctUntilChanged());
  }

  updateMenuStatus(status: boolean) {
    this.$menuStatus.next(status);
  }

}
