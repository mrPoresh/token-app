import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { loginTrx, menuOutlet, userTrx, walletTrx } from 'src/app/router-translation.labels';
import { LoggedStatus } from 'src/app/services/auth/auth.models';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';

import { SlideMenuBtnService } from 'src/app/utils/slide-menu-btn.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BasePageComponent implements OnInit {

  public isExtend = false;
  public isFull = true;
  public isLogged = false;

  loginTrx = loginTrx;
  userTrx = userTrx;
  walletTrx = walletTrx;
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let scrollTrigger = 30;
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
      this.isExtend = true;
    } else {
      this.isExtend = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let smallTrigger = 700;
    if (event.target.innerWidth >= smallTrigger) {
      this.isFull = true;
    } else {
      this.isFull = false;
    }
  }

  constructor(
    private loginStatusService: LoginStatusService,
    private menuService: SlideMenuBtnService,
    private router: Router,
  ) {
    super()
  }

  ngOnInit() {
    this.checkHeader();

    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res.isLogged === LoggedStatus.logged) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    });
  }

  checkHeader() {
    let smallTrigger = 700;
    if (window.screen.width >= smallTrigger) {
      this.isFull = true;
    } else {
      this.isFull = false;
    }
  }

  openMenu() {
    this.menuService.updateMenuStatus(true);
  }

  navigateSlideMenu(url: string) {
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

}
