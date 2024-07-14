export interface IUser {
    email?: string;
    password?: string;
}

export interface ILogin {
    id?: string;
    email?: string;
    username?: string;
    role?: ['admin' | 'user']
    isDeleted?: boolean;
    isGoogleAuth?: boolean;
}
