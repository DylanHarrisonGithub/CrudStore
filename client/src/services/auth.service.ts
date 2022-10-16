import config from '../config/config.json';

import StorageService from './storage.service';


export const StorageMethods = {
  LOCAL: 'local', local: 'local', 
  SESSION: 'session', session: 'session', 
  COOKIE: 'cookie', cookie: 'cookie', 
  WINDOW: 'window', window: 'window', 
};

const AuthService = {

  storeToken: (token: any, method?: "local" | "session" | "cookie" | "window"): void => {
    //StorageService[<"local" | "session" | "cookie" | "window">StorageMethods[<"local" | "session" | "cookie" | "window">(method || config.AUTH_TOKEN_STORAGE_METHOD || "window")]].store('token', token);
    //StorageService[<"local" | "session" | "cookie" | "window">((method || config.AUTH_TOKEN_STORAGE_METHOD || "window").toLowerCase())].store('token', token);
    switch(method || config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        StorageService.local.store('token', token);
        break;
      case 'SESSION': 
        StorageService.session.store('token', token);
        break;
      case 'COOKIE': 
        StorageService.cookie.store('token', token);
        break;
      default: 
        StorageService.window.store('token', token);
        break;
    }
  },
  retrieveToken(method?: string): string {
    switch(method || config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        return StorageService.local.retrieve('token');
      case 'SESSION': 
        return StorageService.session.retrieve('token');
      case 'COOKIE': 
        return StorageService.cookie.retrieve('token');
      default: 
        return StorageService.window.retrieve('token');
    }
  },
  logout(method?: string): void {
    switch(method || config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        StorageService.local.store('token', "");
        break;
      case 'SESSION': 
        StorageService.session.store('token', "");
        break;
      case 'COOKIE': 
        StorageService.cookie.store('token', "");
        break;
      default: 
        StorageService.window.store('token', "");
        break;
    }
    
    //this._router.navigate(['home']);
    // console.log('auth.service.ts: logout(): incomplete. should use router to properly navigate!');
    // window.location.href = '/home';
  },
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
