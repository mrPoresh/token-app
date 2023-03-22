import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { loginTrx, signUpTrx, menuOutlet, walletTrx, userTrx } from './router-translation.labels';
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

  @ViewChild('sidenav') sidenav!: MatSidenav;

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
    
    this.checkSessionService.requestCheckSession();

  }

  closeMenu() {
    this.menuService.updateMenuStatus(false);
  }

}
