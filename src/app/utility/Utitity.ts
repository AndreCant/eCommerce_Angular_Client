import { AppConstants } from "../app.constants";
import * as CryptoJS from 'crypto-js';

export function getUserId(): number | null{
    const loginStorage = localStorage.getItem(AppConstants.LOGIN_STORAGE);
    let login: string | null = loginStorage ? decrypt(loginStorage) : null;
    if (login) return JSON.parse(login).user_id;
    return null;
}

export function encrypt(text: string): string{
    return CryptoJS.AES.encrypt(text.trim(), AppConstants.ENCRYPT_PASSWORD).toString();
}

export function decrypt(text: string): string{
    return CryptoJS.AES.decrypt(text.trim(), AppConstants.ENCRYPT_PASSWORD).toString(CryptoJS.enc.Utf8);
}

export function isAdmin(): boolean{
    const loginStorage = localStorage.getItem(AppConstants.LOGIN_STORAGE);
    let login: string | null = loginStorage ? decrypt(loginStorage) : null;

    return login ? JSON.parse(login).user_role === AppConstants.ADMIN : false;
}