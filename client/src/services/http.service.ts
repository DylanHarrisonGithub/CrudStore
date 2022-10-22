import AuthService from './auth.service';
import ValidationService, { ValidationErrors } from './validation.service';

import config from '../config/config';

export type HttpServiceReturnType<T> = Promise<{
  error?: Error,
  validationErrors?: ValidationErrors,
  response?: T
}>;

// all http service calls are assumed to accept only application/json

const HttpService = {

  get<T = void>(route: string, params?: any, schema?: any, url?: string): HttpServiceReturnType<T> {
    
    let options: any = { method: 'GET', headers: { Accept: 'application/json' } };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options.headers['token'] = JSON.stringify(AuthService.retrieveToken());
    }
    if (params) {
      options['params'] = new URLSearchParams(params).toString();
    }

    return fetch(
      url || (config.URI[config.ENVIRONMENT] + "api/" + route),
      options
    ).then(res => res.json()).then((res: T) => { 
      if (schema) {
        return {
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return { response: res };
      }
    }).catch((e: Error) => { return {error: e} });
  },

  post<T = void>(route: string, body: any, schema?: any, url?: string): HttpServiceReturnType<T> {
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
    ).then(res => res.json()).then((res: T) => {
      if (schema) {
        return {
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return { response: res };
      }
    }).catch((e: Error) => { return { error: e }});
  },

  put<T = void>(route: string, body: any, schema?: any, url?: string): HttpServiceReturnType<T> {
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
        body: body,
        ...options
      }
    ).then(res => res.json()).then((res: T) => {
      if (schema) {
        return {
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return { response: res };
      }
    }).catch((e: Error) => { return { error: e }});
  },

  patch<T = void>(route: string, body: any, schema?: any, url?: string): HttpServiceReturnType<T> {
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
        body: body,
        ...options
      }
    ).then(res => res.json()).then((res: T) => {
      if (schema) {
        return {
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return { response: res };
      }
    }).catch((e: Error) => { return { error: e }});
  },

  delete<T = void>(route: string, params?: any, schema?: any, url?: string): HttpServiceReturnType<T> {
    let options: any = { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'} 
    };
    if (AuthService.isLoggedIn() && config.AUTH_TOKEN_STORAGE_METHOD !== 'COOKIE') {
      options['headers']['token'] = JSON.stringify(AuthService.retrieveToken())
    }
    if (params) {
      options['params'] = new URLSearchParams(params).toString()
    }
    return fetch(
      url? url : config.URI[config.ENVIRONMENT] + "api/" + route,
      {
        ...options
      }
    ).then(res => res.json()).then((res: T) => {
      if (schema) {
        return {
          validationErrors: ValidationService(res, schema),
          response: res
        }
      } else {
        return { response: res };
      }
    }).catch((e: Error) => { return { error: e }});
  }
}

export default HttpService;
