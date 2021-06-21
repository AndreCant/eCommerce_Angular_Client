import { AppConstants } from "../app.constants";

export function getUserId(): number | null{
    let login: string | null = localStorage.getItem(AppConstants.LOGIN_STORAGE);
    if (login) return JSON.parse(login).user_id;
    return null;
}