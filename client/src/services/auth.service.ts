import { StorageService } from './storage.service';

import config from '../config/config.json';

export class AuthService {
  
  private _storageService: StorageService;

  constructor() {
    console.log('auth.service.ts: storage service not yet properly initialized!');
    this._storageService = new StorageService();
  }

  storeToken(token: any, method?: string): void {
    switch(method ? method : config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        this._storageService.local.store('token', token);
        break;
      case 'SESSION': 
        this._storageService.session.store('token', token);
        break;
      case 'COOKIE': 
        this._storageService.cookie.store('token', token);
        break;
      default: 
        this._storageService.memory.store('token', token);
        break;
    }
  }

  retrieveToken(method?: string): string {
    switch(method ? method : config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        return this._storageService.local.retrieve('token');
        break;
      case 'SESSION': 
        return this._storageService.session.retrieve('token');
        break;
      case 'COOKIE': 
        return this._storageService.cookie.retrieve('token');
        break;
      default: 
        return  this._storageService.memory.retrieve('token');
        break;
    }
  }

  logout(): void {
    switch(config.AUTH_TOKEN_STORAGE_METHOD) {
      case 'LOCAL': 
        this._storageService.local.store('token', "");
        break;
      case 'SESSION': 
        this._storageService.session.store('token', "");
        break;
      case 'COOKIE': 
        this._storageService.cookie.store('token', "");
        break;
      default: 
        this._storageService.memory.store('token', "");
        break;
    }
    
    //this._router.navigate(['home']);
    console.log('auth.service.ts: logout(): incomplete. should use router to properly navigate!');
    window.location.href = '/home';
  }

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
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

}
