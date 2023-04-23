import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs';
import { LoggedStatus, UserInfo } from 'src/app/services/auth/auth.models';
import { CheckSessionService } from 'src/app/services/auth/check-session/check-session.service';
import { LogoutService } from 'src/app/services/auth/logout/logout.service';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';
import { LoginProviderService } from 'src/app/services/provider/login-provider.service';
import { SlideMenuBtnService } from 'src/app/utils/slide-menu-btn.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-user-slide',
  templateUrl: './user-slide.component.html',
  styleUrls: ['./user-slide.component.scss']
})
export class UserSlideComponent extends BasePageComponent implements OnInit {

  public User!: UserInfo;

  public isProvider = false;

  constructor(
    private menuService: SlideMenuBtnService,
    private loginStatusService: LoginStatusService,
    private logoutService: LogoutService,
    private loginProviderService: LoginProviderService,
  ) {
    super();
  }

  ngOnInit() {
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;
      
      if (this.User.isProvider === LoggedStatus.logged) {
        this.isProvider = true;
      } else {
        this.isProvider = false;
      }
    });
  }

  logOutProvider() {
    this.loginProviderService.logOut();
    this.isProvider = false;
  }

  logOut() {
    this.logoutService.logOut().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.menuService.updateMenuStatus(false);
    });
  }

}
