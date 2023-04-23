import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap, map, of } from 'rxjs';
import { loginTrx, menuOutlet } from 'src/app/router-translation.labels';
import { LoggedStatus } from 'src/app/services/auth/auth.models';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';

import { SlideMenuBtnService } from '../../utils/slide-menu-btn.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginStatusService: LoginStatusService, 
    private menuService: SlideMenuBtnService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStatusService.getLoginStatus().pipe(
      switchMap((res) => {
        if (res.isLogged === LoggedStatus.logged) {
          return of(true)
        } else {
          this.router.navigate([{ outlets: { [menuOutlet] : [loginTrx] }}]);
          this.menuService.updateMenuStatus(true);
          return of(false)
        }
      })
    );
  }
  
}
