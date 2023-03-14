import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/services/auth/auth.models';
import { CheckSessionService } from 'src/app/services/auth/check-session/check-session.service';
import { LoginEmailService } from 'src/app/services/auth/login/login-email.service';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { SlideMenuBtnService } from 'src/app/utils/slide-menu-btn.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-user-slide',
  templateUrl: './user-slide.component.html',
  styleUrls: ['./user-slide.component.scss']
})
export class UserSlideComponent extends BasePageComponent implements OnInit {

  public User!: UserInfo;

  constructor(
    private loginStatusService: LoginStatusService,
    private checkSessionService: CheckSessionService,
    //private menuService: SlideMenuBtnService,
    private userHttpServeice: LoginEmailService
  ) {
    super();
  }

  ngOnInit() {
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;
    });
  }

  logOut() {
    //this.menuService.updateMenuStatus(false);
    this.userHttpServeice.logOut().pipe(
      switchMap((res) => this.checkSessionService.requestCheckSession())
    )
  }

}
