import { Injectable } from '@angular/core';

import { IRaribleSdk } from '@rarible/sdk/build/domain';
import { createRaribleSdk } from "@rarible/sdk"

@Injectable({
  providedIn: 'root'
})
export class BaseWalletProviderService {

  public raribleSdk!: IRaribleSdk;

  constructor() { }

  initSDKwithProvider(provider: any) {
    this.raribleSdk = createRaribleSdk(provider, "prod");
    console.log("Connecting SDK with provider");
  }

  initSDKwiithOutProvider() {
    this.raribleSdk = createRaribleSdk(undefined, "prod");
    console.log("Connecting SDK without provider");
  }

}
