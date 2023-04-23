export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
}

export interface UserInfo {
    isLogged: LoggedStatus;
    isProvider: LoggedStatus;
    user?: {
        username?: string;
        surname?: string;
        firstname?: string;
        wallets?: Wallet[]
    },
    provider?: any
}

export interface Wallet {
    name: string,
    xpub: string,
    walletname: string,
    accounts?: Account[],
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
    id: string,
    deposits?: Deposit[]
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

export interface RegistrationResponse {
    data: {
        token: string,
        mnemonic: string,
    }
}

export interface CreateWalletResponse {
    data: {
        mnemonic: string,
    }
}
