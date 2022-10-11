import config from '../config/config.json';

import StorageService from './storage.service';

const AuthService = {

  storeToken: (token: any, method?: string): void => {
    switch(method ? method : config.AUTH_TOKEN_STORAGE_METHOD) {
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
    switch(method ? method : config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        return StorageService.local.retrieve('token');
        break;
      case 'SESSION': 
        return StorageService.session.retrieve('token');
        break;
      case 'COOKIE': 
        return StorageService.cookie.retrieve('token');
        break;
      default: 
        return StorageService.window.retrieve('token');
        break;
    }
  },
  logout(): void {
    switch(config.AUTH_TOKEN_STORAGE_METHOD) {
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
    console.log('auth.service.ts: logout(): incomplete. should use router to properly navigate!');
    window.location.href = '/home';
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
