import { AuthService } from './auth.service';
import { ValidationService } from './validation.service';

import config from '../config/config.json';

export class HttpService {

  private _authService: AuthService;
  private _validationService: ValidationService;
  
  constructor() {
    this._authService = new AuthService();
    this._validationService = new ValidationService();
  }

  get(route: string, params?: any, schema?: any, url?: string): Promise<any> {
    let options: any = { method: 'GET' };
    if (this._authService.isLoggedIn()) {
      options['headers'] = {};
      options['headers']['token'] = JSON.stringify(this._authService.retrieveToken())
    }
    if (params) {
      options['params'] = new URLSearchParams(params).toString()
    }

    return fetch(
      url? url : config.URI[<"DEVELOPMENT" | "LAN" | "DEPLOY">config.ENVIRONMENT] + "api/" + route,
      options
    ).then(res => {
      if (schema) {
        return {
          validationErrors: this._validationService.validate(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }

  post(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    };
    if (this._authService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(this._authService.retrieveToken())
    }
    return fetch(
      url ? url : config.URI[<"DEVELOPMENT" | "LAN" | "DEPLOY">config.ENVIRONMENT] + "api/" + route,
      {
        body: JSON.stringify(body),
        ...options
      }
    ).then(res => {
      if (schema) {
        return {
          validationErrors: this._validationService.validate(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }

  put(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'PUT',
      headers: {'Content-Type': 'application/json'} 
    };
    if (this._authService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(this._authService.retrieveToken())
    }
    return fetch(
      url? url : config.URI[<"DEVELOPMENT" | "LAN" | "DEPLOY">config.ENVIRONMENT] + "api/" + route,
      {
        body: body,
        ...options
      }
    ).then(res => {
      if (schema) {
        return {
          validationErrors: this._validationService.validate(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }

  patch(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'} 
    };
    if (this._authService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(this._authService.retrieveToken())
    }
    return fetch(
      url? url : config.URI[<"DEVELOPMENT" | "LAN" | "DEPLOY">config.ENVIRONMENT] + "api/" + route,
      {
        body: body,
        ...options
      }
    ).then(res => {
      if (schema) {
        return {
          validationErrors: this._validationService.validate(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }

  delete(route: string, params?: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'} 
    };
    if (this._authService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(this._authService.retrieveToken())
    }
    if (params) {
      options['params'] = new URLSearchParams(params).toString()
    }
    return fetch(
      url? url : config.URI[<"DEVELOPMENT" | "LAN" | "DEPLOY">config.ENVIRONMENT] + "api/" + route,
      {
        ...options
      }
    ).then(res => {
      if (schema) {
        return {
          validationErrors: this._validationService.validate(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }
}
