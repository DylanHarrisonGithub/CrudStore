import config from '../config/config';

import StorageService from './storage.service';

const AuthService = {

  storeToken: (token: any, method?: "LOCAL" | "SESSION" | "COOKIE" | "WINDOW"): void => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].store('token', token),

  retrieveToken: (method?: "LOCAL" | "SESSION" | "COOKIE" | "WINDOW"): any => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].retrieve('token'),
   
  logout: (method?: "LOCAL" | "SESSION" | "COOKIE" | "WINDOW"): void => StorageService[method || config.AUTH_TOKEN_STORAGE_METHOD].store('token', ""),

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
