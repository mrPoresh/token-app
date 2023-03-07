export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
}

export interface UserInfo {
    isLogged: LoggedStatus;
    user?: {
        username?: string;
        surname?: string;
        firstname?: string;
        wallets?: Wallet[]
    },
}

export interface Wallet {
    wallet: {
        name: string,
        xpub: string,
        accounts?: Account[],
    }
}

export interface Account {
    account: {
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
} 

export interface Deposit {
    deposit: {
        xpub: string,
        derivationKey: number,
        address: string,
        currency: string,
    }
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
