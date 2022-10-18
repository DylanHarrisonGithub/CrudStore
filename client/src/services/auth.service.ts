import config from '../config/config';

import StorageService from './storage.service';

type AuthMethod = "LOCAL" | "SESSION" | "COOKIE" | "WINDOW";

const AuthService = {

  storeToken: (token: any, method?: AuthMethod): void => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].store('token', token),

  retrieveToken: (method?: AuthMethod): any => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].retrieve('token'),
   
  logout: (method?: AuthMethod): void => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].store('token', ""),

  getUserDetails() {
    const token = this.retrieveToken();
    let payload;
    if (token) {
      let split = token.split('.');
      if (split.length > 1) {
        payload = split[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      }
      return null;
    } else {
      return null;
    }
  },

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

}

export default AuthService;
