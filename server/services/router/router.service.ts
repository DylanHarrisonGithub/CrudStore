import server from '../../server';

export interface RouterResponse {
  code: number,
  headers?: { [key: string]: string },
  filename?: string,
  html?: string,
  json?: {
    success: boolean,
    message: string[],
    body?: any
  }
}
export type RouterService = (request: any) => RouterResponse;

export default (request: any): RouterResponse => {
  if (request.hasOwnProperty('route')) {
    let route: any = server.routes[request.route];
    if (route) {
      if (route.method.indexOf(request.method) > -1) {
        if (route.privelege.indexOf('guest') > -1) {
  
          let validationErrors = server.services.validation(
            request.params,
            route.schema
          );
  
          if (!validationErrors.length) {
            return route(request);
          } else {
            return {
              code: 400,  // bad request
              json: {
                success: false,
                message: ['Validation failed for route parameters.'].concat(validationErrors.map(err => `key: ${err.key}: ${err.message}`))
              }
            };
          }
  
        } else {
          if (request.token) {
            let token = server.services.authentication.decodeToken(request.token);
            if (token) {
              if (token.hasOwnProperty('privelege') && route.privelege.indexOf(token.privelege) > -1) {
  
                let validationErrors = server.services.validation(
                  request.params,
                  route.schema
                );
        
                if (!validationErrors.length) {
                  return route(request);
                } else {
                  return {
                    code: 400,  // bad request
                    json: {
                      success: false,
                      message: ['Validation failed for route parameters.'].concat(validationErrors.map(err => `key: ${err.key}: ${err.message}`))
                    }
                  };
                }
  
              } else {
                return {
                  code: 403,  // forbidden
                  json: {
                    success: false,
                    message: ['Provided authentication does not have privelege to access route.']
                  }
                }
              }
            } else {
              return {
                code: 403, // forbidden
                json: {
                  success: false,
                  message: ['Provided authentication was not valid.']
                }
              };
            }
          } else {
            return {
              code: 401, // unauthorized
              json: {
                success: false,
                message: ['Authentication was not provided for protected route.']
              }
            };
          }
        }
      } else {
        return {
          code: 405,  // method not allowed
          json: {
            success: false,
            message: ['Method not allowed.', `Provided route, '${request.route}' is ${route.method} method.`]
          }
        };
      }
    } else {
      return {
        code: 404,  // not found
        json: {
          success: false,
          message: [`Provided route, '${request.route}' does not exist.`]
        }
      };
    }
    
  } else {
    return {
      code: 400,  // bad request
      json: {
        success: false,
        message: ['Route was not provided.']
      }
    };
  }
}