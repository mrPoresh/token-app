export enum LoggedStatus {
    voidState = 0,
    notLogged = -1,
    logged = 1,
}

export interface UserInfo {
    isLogged: LoggedStatus;
    username?: string;
    language?: string;
    currency?: string;
    isLoggedFirebase?: LoggedStatus;
}

export interface LoginEmailResponse {
    data: {
        token: string;
    }
}
