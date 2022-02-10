import { AppConstants } from "../app.constants";
import * as CryptoJS from 'crypto-js';
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginResult } from "../model/LoginResult";

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

export function getSize(size: any, gender: any, type: any): any{
    if (type !== 'shoes') return size;
    switch (gender) {
        case 'M': 
            switch (size) {
                case 'S': return 40;
                case 'M': return 41;
                case 'L': return 42;
                case 'XL': return 43;
                default: return size;
            }
        case 'F': 
            switch (size) {
                case 'S': return 37;
                case 'M': return 38;
                case 'L': return 39;
                case 'XL': return 40;
                default: return size;
            }
        case 'K': 
            switch (size) {
                case 'S': return 34;
                case 'M': return 35;
                case 'L': return 36;
                case 'XL': return 37;
                default: return size;
            }
    }
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
  
export function getToken() : string{
    let loginStored: LoginResult;
    const loginStorage =  localStorage.getItem(AppConstants.LOGIN_STORAGE);
    let loginStr: string | null = loginStorage ? decrypt(loginStorage) : null;

    if (loginStr) {
        loginStored = JSON.parse(loginStr);
    } else {
        return '';
    }

    return loginStored.token;
}