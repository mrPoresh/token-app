import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { loginTrx, rootTrx, signUpTrx, testTrx, menuOutlet, walletTrx, userTrx } from './router-translation.labels';
import { LoggedStatus } from './services/auth/auth.models';
import { CheckSessionService } from './services/auth/check-session/check-session.service';
import { BaseHttpService } from './services/http/base-http.service';
import { SlideMenuBtnService } from './utils/slide-menu-btn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements OnInit {
  title = 'token-market';

  loginTrx = loginTrx;
  walletTrx = walletTrx;
  userTrx = userTrx;

  public isExtend = false;
  public isFull = false;
  public isMedium = false;

  public isLogged = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let scrollTrigger = 30;
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
      this.isExtend = true;
    } else {
      this.isExtend = false
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuService: SlideMenuBtnService,
    private baseHttpService: BaseHttpService,
    private checkSessionService: CheckSessionService
  ) {
    super()
  }

  ngOnInit() {
    this.checkHeader();
    this.menuService.getMenuStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res) {
        this.sidenav.open();
      } else {
        if (this.sidenav) {
          this.sidenav.close();
        }
        this.router.navigate([{ outlets: { [menuOutlet] : null }}], { relativeTo: this.activatedRoute.parent });
      }
    });
    
    this.checkSessionService.requestCheckSession().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log('App Comp User', res);
      if (res.isLogged === LoggedStatus.logged) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    });

  }

  openMenu() {
    this.menuService.updateMenuStatus(true);
  }

  closeMenu() {
    this.menuService.updateMenuStatus(false);
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  navigateSlideMenu(url: string) {
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

  /* --------------------------------------------------------------------------------------------- */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let smallTrigger = 700;
    let mediumTrigger = 1100;
    if (event.target.innerWidth >= mediumTrigger) {
      this.isFull = true;
      this.isMedium = true;
    } else if (event.target.innerWidth <= mediumTrigger && event.target.innerWidth >= smallTrigger) {
      this.isFull = true;
      this.isMedium = false;
    } else {
      this.isFull = false;
      this.isMedium = false;
    }
  }
  /* --------------------------------------------------------------------------------------------- */

  checkHeader() {
    let smallTrigger = 700;
    let mediumTrigger = 1100;
    if (window.screen.width >= mediumTrigger) {
      this.isFull = true;
      this.isMedium = true;
    } else if (window.screen.width <= mediumTrigger && window.screen.width >= smallTrigger) {
      this.isFull = true;
      this.isMedium = false;
    } else {
      this.isFull = false;
      this.isMedium = false;
    }
  }

  /* --------------------------------------------------------------------------------------------- */

}
