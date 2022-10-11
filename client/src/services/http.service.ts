import AuthService from './auth.service';
import ValidationService from './validation.service';

import config from '../config/config.json';

const HttpService = {

  get(route: string, params?: any, schema?: any, url?: string): Promise<any> {
    let options: any = { method: 'GET' };
    if (AuthService.isLoggedIn()) {
      options['headers'] = {};
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
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
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  },

  post(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    };
    if (AuthService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
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
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  },

  put(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'PUT',
      headers: {'Content-Type': 'application/json'} 
    };
    if (AuthService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
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
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  },

  patch(route: string, body: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'} 
    };
    if (AuthService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
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
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  },

  delete(route: string, params?: any, schema?: any, url?: string): Promise<any> {
    let options: any = { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'} 
    };
    if (AuthService.isLoggedIn()) {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
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
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return res;
      }
    });
  }
}

export default HttpService;
