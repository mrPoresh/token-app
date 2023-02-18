import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { loginTrx, signUpTrx } from './router-translation.labels';
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
  signUpTrx = signUpTrx;

  public routeTrx: string = '';

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

  constructor(
    private router: Router,
    private menuService: SlideMenuBtnService,
    private baseHttpService: BaseHttpService,
  ) {
    super()
  }

  ngOnInit() {
    this.checkHeader();
    this.menuService.getMenuStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res) {
        this.toggleMenu(res);
      }
    });

    this.baseHttpService.get('/').subscribe((res) => console.log('res', res))

  }

  openMenu() {
    this.menuService.updateMenuStatus(true);
  }

  closeMenu() {
    this.menuService.updateMenuStatus(false);
  }

  toggleMenu(status: boolean) {
    if (status) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  checkHeader() {
    let smallTrigger = 700;
    let mediumTrigger = 1100;
    if (window.screen.width >= mediumTrigger) {
      this.isFull = true;
      this.isMedium = true;
      console.log(this.isMedium)
      console.log(window.screen.width)
    } else if (window.screen.width <= mediumTrigger && window.screen.width >= smallTrigger) {
      this.isFull = true;
      this.isMedium = false;
    } else {
      this.isFull = false;
      this.isMedium = false;
    }
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  navigateSlideMenu(url: string) {
    this.routeTrx = url;
    console.log(url)
    this.router.navigate([{ outlets: { 'slide-menu' : [this.routeTrx] }}]);
  }

}
