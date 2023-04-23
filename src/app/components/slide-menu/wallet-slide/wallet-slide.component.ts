import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/services/auth/auth.models';
import { UserInfoService } from 'src/app/services/auth/info/user-info.service';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
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

  public xpubs: any[] = [];

  public User!: UserInfo;

  public mnemonic: string = '';

  public isAddWallet = false;
  public isWalletAdded = false;
  public isAddAccount = false;
  public isAccountAdded = false;

  walletForm = this.formBuilder.group({
    walletname: new FormControl('', [ Validators.required ]),
    currency: new FormControl(''),
  });

  accountForm = this.formBuilder.group({
    xpub: new FormControl(''),
    currency: new FormControl(''),
  });

  constructor(
    private loginStatusService: LoginStatusService,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private walletsService: WalletsService,
    private userInfoService: UserInfoService,
  ) {
    super();
    this.loader.show({status: true});
  }

  ngOnInit() {
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;

      if (this.User.user?.wallets) {
        this.User.user?.wallets!.forEach((wallet) => {
          this.xpubs.push({value: wallet.xpub, viewValue: wallet.walletname});
        });
      }

      console.log(this.xpubs)

      this.loader.hide();
    })

  }

  createWallet(walletForm: FormGroup) {
    this.loader.show({status: true});
    this.changeAddWalletStatus(false);
    this.changeIsWalletAddedStatus(true);

    this.walletsService.createWallet(walletForm).pipe(
      takeUntil(this.unsubscribe),
      switchMap((res) => {
        this.mnemonic = res.data.mnemonic;
        return this.userInfoService.requestCheckUserInfo();
      })
    ).subscribe((res) => {
      this.loader.hide();
      this.User = res;
    });
  }

  createAccount(accountForm: FormGroup) {
    this.loader.show({status: true});
    this.changeAddAccStatus(false);
    this.changeAccountAddedStatus(true);

    this.walletsService.createAccount(accountForm).pipe(
      takeUntil(this.unsubscribe),
      switchMap(() => this.userInfoService.requestCheckUserInfo())
    ).subscribe((res) => {
      this.loader.hide();
      this.User = res;
    });
  }

  changeAddWalletStatus(status: boolean) {
    this.isAddWallet = status;
  }

  changeIsWalletAddedStatus(status: boolean) {
    this.isWalletAdded = status;
  }

  changeAddAccStatus(status: boolean) {
    this.isAddAccount = status;
  }

  changeAccountAddedStatus(status: boolean) {
    this.isAccountAdded = status;
  }

}
