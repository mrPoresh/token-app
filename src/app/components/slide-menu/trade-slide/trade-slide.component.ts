import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { menuOutlet, walletTrx } from 'src/app/router-translation.labels';
import { UserInfo } from 'src/app/services/auth/auth.models';
import { UserInfoService } from 'src/app/services/auth/info/user-info.service';
import { LoginStatusService } from 'src/app/services/auth/status/login-status.service';
import { TradeService } from 'src/app/services/trade/trade.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

export interface Account {
  availableBalance: number,
  currency: string,
  id: string,
};

@Component({
  selector: 'app-trade-slide',
  templateUrl: './trade-slide.component.html',
  styleUrls: ['./trade-slide.component.scss']
})
export class TradeSlideComponent extends BasePageComponent implements OnInit {

  public conversion_string: string = '';
  public conversion_final: string = '';

  public trade_pairs: string[] = [];
  public user_accounts: Account[] = [];
  public buy_accounts: Account[] = [];
  public sell_accounts: Account[] = [];

  public User!: UserInfo;

  tradeForm = this.formBuilder.group({
    price: new FormControl(''),
    income_id: new FormControl(''), 
    out_id: new FormControl(''), 
    pair: new FormControl(''),        //  LTC/VC_USD !
    buy_crypto: new FormControl(true)
  });

  conversionForm = this.formBuilder.group({
    amount: new FormControl(1),
    sell_curr: new FormControl(''),   //  USD !
    buy_curr: new FormControl(''),    //  LTC
  });

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private loginStatusService: LoginStatusService,
    private userInfoService: UserInfoService,
    private tradeService: TradeService,
    private router: Router,
  ) {
    super();
    this.loader.show({status: true});
  };

  ngOnInit() {
    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.User = res;

      try {
        if (this.User.user?.wallets) {
          if (this.User.user?.wallets[0].accounts) {
            const currencies: string[] = [];

            this.User.user?.wallets.forEach((wallet) => {
              wallet.accounts?.forEach((account) => {
                this.user_accounts.push({
                  availableBalance: parseFloat(account.balance.availableBalance),
                  currency: account.currency,
                  id: account.id,
                });

                currencies.push(account.currency);
              });
            });

            this.trade_pairs = this.generatePairs(currencies);

          } else {
            throw new Error('User without account');
          };

        } else {
          throw new Error('User without wallet');
        };

        this.loader.hide();

      } catch(error) {
        // critical error: goto error page
      };

    });
  };

  generatePairs(currencies: string[]): string[] {
    const trade_pairs: string[] = [];
  
    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        if (i !== j && currencies[i] !== currencies[j]) {
          const pair = `${currencies[i]}/${currencies[j]}`;
          trade_pairs.push(pair);
        }
      }
    }
  
    return trade_pairs;
  };

  onPairSelected(selectedPair: string) {
    this.buy_accounts = [];
    this.sell_accounts = [];

    const [buy_currency, sell_currency] = selectedPair.split('/');
    const formattedBuyCurrency = buy_currency.replace('VC_', '');
    const formattedSellCurrency = sell_currency.replace('VC_', '');

    this.conversionForm.patchValue({
      sell_curr: formattedSellCurrency,
      buy_curr: formattedBuyCurrency,
    });

    this.tradeService.getPriceConversion(this.conversionForm).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      const data = res.data;
      this.conversion_string = data[0].amount + ' ' + data[0].name + ' = ' + data[0].quote[formattedBuyCurrency].price + ' ' + formattedBuyCurrency;
    });

    this.user_accounts.forEach((account) => {
      if (account.currency == buy_currency) {
        this.buy_accounts.push(account)
      };

      if (account.currency == sell_currency) {
        this.sell_accounts.push(account)
      }
    });
  };

  priceConversion() {
    const [buy_currency, sell_currency] = this.tradeForm.value.pair!.split('/');
    const formattedBuyCurrency = buy_currency.replace('VC_', '');
    const formattedSellCurrency = sell_currency.replace('VC_', '');

    this.conversionForm.patchValue({
      amount: parseFloat(this.tradeForm.value.price!),
      sell_curr: formattedSellCurrency,
      buy_curr: formattedBuyCurrency,
    });

    this.tradeService.getPriceConversion(this.conversionForm).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      const data = res.data;
      this.conversion_final = data[0].quote[formattedBuyCurrency].price + ' ' + formattedBuyCurrency;
    });

    this.conversionForm.patchValue({amount: 1});
  }

  tradeWithMaster() {
    this.loader.show({status: true});

    this.tradeService.tradeWithMaster(this.tradeForm).pipe(takeUntil(this.unsubscribe)).subscribe(
      (res) => {
        console.log(res);
        if (res.msg == "OK") {
          this.userInfoService.requestCheckUserInfo().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
            console.log(res);
            this.User = res;
          })
          this.navigateSlideMenu(walletTrx);
        }
        this.loader.hide();
      },
      (error) => {
        console.log(error);
        this.loader.hide();
      },
    );
  }

  navigateSlideMenu(url: string) {
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

};
