export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
}

export interface UserInfo {
    isLogged: LoggedStatus;
    username?: string;
    wallets?: Wallet[]
}

export interface Wallet {
    xpub: string,
    accounts?: Account[],
    deposits?: Deposit[]
}

export interface Account {
    currency: string,
    active: boolean,
    frozen: boolean,
    balance: {
        accountBalance: string,
        availableBalance: string,
    },
    xpub: string,
    accountingCurrency: string,
    id: string
} 

export interface Deposit {
    xpub: string,
    derivationKey: number,
    address: string,
    currency: string,
}

export interface LoginEmailResponse {
    data: {
        token: string;
    }
}
