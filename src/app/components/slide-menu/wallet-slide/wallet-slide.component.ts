import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs';
import { LoggedStatus, UserInfo } from 'src/app/services/auth/auth.models';
import { UserInfoService } from 'src/app/services/auth/info/user-info.service';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { LoginProviderService } from 'src/app/services/provider/login-provider.service';

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
  public options: any[] = [];

  public User!: UserInfo;

  public mnemonic: string = '';

  public isAddWallet = false;
  public isWalletAdded = false;
  public isAddAccount = false;
  public isAccountAdded = false;

  public isProvider = false;

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
    public winRef: WindowProviderService,
    private loginProviderService: LoginProviderService,
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

      if (this.User.isProvider == LoggedStatus.logged) {
        this.isProvider = true;
      } else {
        this.isProvider = false;
      }

      this.loader.hide();
    })

  }

  /* ------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------ */

  async connectMetamask() {
    this.loader.show({status: true});
    if (this.winRef.window.ethereum) {
      await this.winRef.window.ethereum.request({ method: "eth_requestAccounts" });
      this.loginProviderService.createConnectorWithMessage();

      this.loginProviderService.getConenctionOptions().subscribe((res: any) => {
        this.options = res;
  
        const option = this.options.find((opt) => {
          return opt.option === 'Metamask'
        });
    
        if (option) {
          this.loginProviderService.loginWithWallet(option).then(() => {
            this.loginProviderService.getConnection().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
              if (res.status === "connected") {
                this.loginStatusService.updateUserInfo({
                  isProvider: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
                  provider: res.status === "connected" ? res.connection : undefined,
                });
              }

              this.loader.hide();
              this.isProvider = true;
            });
          });
        } else {
          this.winRef.window.alert("Please Install Metamask");
          this.loader.hide();
        }
  
      });

    } else {
      this.winRef.window.alert("Please Install Metamask");
      this.loader.hide();
    }

  }

  connectWalletConnect() {
    this.loginProviderService.createConnectorWithMessage();

    this.loginProviderService.getConenctionOptions().subscribe((res) => {
      this.options = res;

      const option = this.options.find((opt) => {
        return opt.option === 'walletconnect'
      });
  
      if (option) {
        this.loginProviderService.loginWithWallet(option).then(() => {
          this.loginProviderService.getConnection().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
            if (res.status === "connected") {
              this.loginStatusService.updateUserInfo({
                isProvider: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
                provider: res.status === "connected" ? res.connection : undefined,
              });
            }

            this.loader.hide();
            this.isProvider = true;
          });
        });
      } else {
        this.winRef.window.alert("Please");
        this.loader.hide();
      }

    });

  }

}
