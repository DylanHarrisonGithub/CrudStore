import AuthService from './auth.service';
import ValidationService, { ValidationErrors } from './validation.service';

import config from '../config/config';

export type HttpServiceReturnType<T> = {
  success: boolean,
  messages: string[],
  body?: T
};

// all http service calls are assumed to accept only application/json except upload

const HttpService = {

  get<T=any>(route: string, params?: any, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    let options: any = { method: 'GET', headers: { Accept: 'application/json' } };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options.headers['token'] = JSON.stringify(AuthService.retrieveToken());
    }
    
    if (params) {
      route += '?' + new URLSearchParams(params).toString();
    }

    return fetch(
      url || (config.URI[config.ENVIRONMENT] + "api/" + route),
      options
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => { 
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - GET - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => { 
      return { 
        success: false,
        messages: [`HttpService - Could not GET ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  },

  post<T = void>(route: string, body: any, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    let options: any = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'}
    };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options.headers['token'] = JSON.stringify(AuthService.retrieveToken());
    }
    return fetch(
      url ? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        body: JSON.stringify(body),
        ...options
      }
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => {
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - POST - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => {
      return { 
        success: false,
        messages: [`HttpService - POST - Could not POST ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  },

  put<T = void>(route: string, body: any, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    let options: any = { 
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'} 
    };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options.headers['token'] = JSON.stringify(AuthService.retrieveToken());
    }
    return fetch(
      url? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        body: JSON.stringify(body),
        ...options
      }
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => {
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - PUT - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => {
      return { 
        success: false,
        messages: [`HttpService - PUT - Could not PUT ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  },

  patch<T = void>(route: string, body: any, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    let options: any = { 
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'} 
    };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
    }
    return fetch(
      url? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        body: JSON.stringify(body),
        ...options
      }
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => {
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - PATCH - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => {
      return { 
        success: false,
        messages: [`HttpService - PATCH - Could not PATCH ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  },

  delete<T = void>(route: string, params?: any, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    
    let options: any = { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'} 
    };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
    }
    if (params) {
      route += '?' + new URLSearchParams(params).toString();
    }

    return fetch(
      url? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        ...options
      }
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => {
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - DELETE - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => {
      return { 
        success: false,
        messages: [`HttpService - DELETE - Could not DELETE ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  },

  upload<T= void>(route: string, file: File, schema?: any, url?: string): Promise<HttpServiceReturnType<T>> {
    
    const body = new FormData();
    body.append(file.name, file);
    
    return fetch(
      url? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        method: 'POST',
        body: body
      }
    ).then(res => res.json()).then((res: HttpServiceReturnType<T>) => {
      if (schema) {
        const schemaErrors = ValidationService(res.body, schema).map(u => `HttpService - UPLOAD - Validation Error - ${u.key}: ${u.message}`);
        return {
          success: res.success && !(schemaErrors.length),
          messages: [ ...schemaErrors, ...res.messages ],
          body: res.body
        }
      } else {
        return res;
      }
    }).catch((e: Error) => {
      return { 
        success: false,
        messages: [`HttpService - UPLOAD - Could not UPLOAD ${url || (config.URI[config.ENVIRONMENT] + "api/" + route)}`, e.message]
      } 
    });
  }
}

export default HttpService;
