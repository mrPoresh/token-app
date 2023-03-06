export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
}

export interface UserInfo {
    isLogged: LoggedStatus;
    username?: string;
    surname?: string;
    firstname?: string;
    wallets?: Wallet[]
}

export interface Wallet {
    name: string,
    xpub: string,
    accounts?: Account[],
}

export interface Account {
    acc: {
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
    },
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
