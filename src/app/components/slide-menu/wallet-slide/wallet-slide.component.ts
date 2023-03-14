import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/services/auth/auth.models';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { BaseWalletService } from 'src/app/services/http/base-wallet.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-wallet-slide',
  templateUrl: './wallet-slide.component.html',
  styleUrls: ['./wallet-slide.component.scss']
})
export class WalletSlideComponent extends BasePageComponent implements OnInit {

  /* public displayedColumns: string[] = ['xpub', 'address']; */

  public currency: any[] = [
    {value: 'LTC', viewValue: 'LTC'},
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BTC', viewValue: 'BTC'},
  ];

  public User!: UserInfo;

  public isAddWallet = false;
  public isAddAccount = false;

  walletForm = this.formBuilder.group({
    name: new FormControl('', [ Validators.required ]),
    currency: new FormControl(''),
  });

  constructor(
    private loginStatusService: LoginStatusService,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private walletService: BaseWalletService
  ) {
    super();
    this.loader.show({status: true});
  }

  ngOnInit() {
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;
      this.loader.hide();
    })

  }

  createWallet(walletForm: FormGroup) {
    this.walletService.createWallet(walletForm).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log(res)
    });
  }

  changeAddWalletStatus(status: boolean) {
    this.isAddWallet = status;
  }

  changeAddAccStatus(status: boolean) {
    this.isAddAccount = status;
  }

}
