import { Injectable } from '@angular/core';
import { BaseWalletProviderService } from './base-wallet-provider.service';
import { from, Observable } from 'rxjs';

import Web3 from 'web3';
import { WalletConnectConnectionProvider } from "@rarible/connector-walletconnect";
import { Web3Ethereum } from "@rarible/web3-ethereum";
import { EthereumWallet } from "@rarible/sdk-wallet";
import { 
  Connector, 
  InjectedWeb3ConnectionProvider, 
  DappType, 
  IConnectorStateProvider, 
  AbstractConnectionProvider, 
  EthereumProviderConnectionResult, 
  ConnectionProvider 
} from "@rarible/connector";

@Injectable({
  providedIn: 'root'
})
export class LoginWalletProviderService extends BaseWalletProviderService {

  private connector: any;

  private state: IConnectorStateProvider = {
    async getValue(): Promise<string | undefined> {
      const value = localStorage.getItem("saved_provider");
      return value ? value : undefined;
    },
    async setValue(value: string | undefined): Promise<void> {
      localStorage.setItem("saved_provider", value || "")
    },
  };

  constructor() { super() };

  /* --------------------------------------------------------------- */

  getState(): Observable<string | undefined> {
    return from(this.state.getValue());
  }

  getConnector() {
    return this.connector;
  }

  getConenctionOptions(): Observable<any> {
    return from(this.connector.getOptions());
  }

  getConnection() {
    return this.connector.connection
  }

  /* --------------------------------------------------------------- */

  metamaskInstance() {
    return this.mapEthereumWallet(new InjectedWeb3ConnectionProvider());
  }

  walletConnectInstance() {
    return this.mapEthereumWallet(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));
  }

  mapEthereumWallet<O>(provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>) {
    return provider.map(state => ({
      wallet: new EthereumWallet(new Web3Ethereum({ web3: new Web3(state.provider), from: state.address })),
      address: state.address
    }))
  }

  createConnector() {
    this.connector = Connector.create(this.metamaskInstance(), this.state).add(this.walletConnectInstance());
  }

  /* --------------------------------------------------------------- */

  mapEthereumWalletWithMessage<O>(provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>) {
    return provider.map((state) => {
      const _wallet = new EthereumWallet(new Web3Ethereum({ web3: new Web3(state.provider), from: state.address }));
      _wallet.signPersonalMessage('It is just like example');
      return {wallet: _wallet, address: state.address}
    })
  }

  metamaskInstanceWithMessage() {
    return this.mapEthereumWalletWithMessage(new InjectedWeb3ConnectionProvider());
  }

  walletConnectInstanceWithMessage() {
    return this.mapEthereumWalletWithMessage(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));
  }

  createConnectorWithMessage() {
    this.connector = Connector.create(this.metamaskInstanceWithMessage(), this.state).add(this.walletConnectInstanceWithMessage());
  }

  /* --------------------------------------------------------------- */

  async loginWithWallet(option: any) {
    console.log("Connect by Wallet");
    this.state.setValue(this.connector.provider);
    await this.connector.connect(option)
  }

  logOut() {
    console.log("Disconect")
    this.state.setValue(undefined);
    this.connector.connection.subscribe((con: any) => {
      if (con.status === "connected") {
        con.disconnect();
      }
    });
  }


}
