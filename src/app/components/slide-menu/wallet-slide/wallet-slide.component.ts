import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/services/auth/auth.models';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-wallet-slide',
  templateUrl: './wallet-slide.component.html',
  styleUrls: ['./wallet-slide.component.scss']
})
export class WalletSlideComponent extends BasePageComponent implements OnInit {

  public User!: UserInfo;

  constructor(
    private loginStatusService: LoginStatusService,
    private loader: LoaderService,
  ) {
    super()
  }

  ngOnInit() {
    //this.loader.show({status: true});
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;
    })

  }

}
