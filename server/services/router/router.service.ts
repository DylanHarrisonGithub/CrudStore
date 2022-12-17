import server from '../../server';
import { Route } from '../../routes/routes';
import { ParsedRequest } from '../requestParser/requestParser.service';
import config from '../../../server/config/config';

export interface RouterResponse<T = any> {
  code: number,
  headers?: { [key: string]: string },
  redirect?: string,
  filename?: string,
  html?: string,
  json?: {
    success: boolean,
    message: string[],
    body?: T
  }
}

// pick preferred compatible response type
export const negotiateCompatibleResponseContentType = (requestAccepts: string, routeContentType: string): string => {

  // break down accepts string into [[type, subtype]]
  const reqTypes: string[][] = requestAccepts.split(',').map(type => type.indexOf(';') > -1 ? type.substring(0, type.lastIndexOf(';')).toLowerCase().split('/') : type.toLowerCase().split('/') );
  const resTypes: string[][] = routeContentType.split(',').map(type => type.indexOf(';') > -1 ? type.substring(0, type.lastIndexOf(';')).toLowerCase().split('/') : type.toLowerCase().split('/') );

  if (reqTypes.some(type => type[0] === '*')) { return resTypes[0].join('/'); }
  if (resTypes.some(type => type[0] === '*')) { return reqTypes[0].join('/'); } // should pretty much never happen

  let matches = resTypes.filter(resType => {
    if (reqTypes.some(reqType => 
      resType[0] === reqType[0] &&
      (
        resType[1] === reqType[1] ||
        resType[1] === '*' || // should pretty much never happen
        reqType[1] === '*'
      )
    )) {
      return true;
    }
  });

  matches = matches.map(resType => resType[1] !== '*' ? resType : reqTypes.find(reqType => resType[0] === reqType[0])!) // but if resType[1] === '*', replace with specified reqType[1] 

  return matches[0]?.join('/') || '';
}

const acceptsJSON = (accepts: string): boolean => accepts.includes('application/json') || accepts.includes('*/*');
const acceptsHTML = (accepts: string): boolean => accepts.includes('text/html') || accepts.includes('*/*');

const error = (request: ParsedRequest, response: RouterResponse): RouterResponse => {
  if (acceptsJSON(request.accepts)) {
    return response;
  } else {
    return {
      code: 302,
      redirect: config.ERROR_URL + (new URLSearchParams(JSON.stringify(response)))
    };
  }
}

const router = async (request: ParsedRequest): Promise<RouterResponse> => {
  if (request.hasOwnProperty('route')) {
    let route: Route | undefined = server.routes[request.route];
    if (route) {
      if (route.method.indexOf(request.method) > -1) {
        if (route.privelege.indexOf('guest') > -1) {
  
          let validationErrors = server.services.validation(
            request.params,
            route.schema
          );
  
          if (!validationErrors.length) {
            const negotiated: string = negotiateCompatibleResponseContentType(request.accepts, route.contentType);
            if (negotiated) {
              
              // route access granted for request!
              request.accepts = negotiated;
              return route.route(request);  
            
            } else {
              return new Promise(res => res(error(request, {
                code: 400,  // bad request
                  json: {
                    success: false,
                    message: [
                      `Could not negotiate response type.`,
                      `Request accepts ${request.accepts}.`,
                      `Route provides ${route!.contentType}`
                    ]
                  }
              })));
            }
          } else {
            return new Promise(res => res(error(request, {
              code: 400,  // bad request
              json: {
                success: false,
                message: ['Validation failed for route parameters.'].concat(validationErrors.map(err => `key: ${err.key}: ${err.message}`))
              }
            })));
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

                  const negotiated: string = negotiateCompatibleResponseContentType(request.accepts, route.contentType);
                    if (negotiated) {

                      // route access granted for request!
                      request.accepts = negotiated;
                      return route.route(request);
                      
                    } else {
                      return new Promise(res => res(error(request, {
                        code: 400,  // bad request
                          json: {
                            success: false,
                            message: [
                              `Could not negotiate response type.`,
                              `Request accepts ${request.accepts}.`,
                              `Route provides ${route!.contentType}`
                            ]
                          }
                      })));
                    }
                } else {
                  return new Promise(res => res(error(request, {
                    code: 400,  // bad request
                    json: {
                      success: false,
                      message: ['Validation failed for route parameters.'].concat(validationErrors.map(err => `key: ${err.key}: ${err.message}`))
                    }
                  })));
                }
  
              } else {
                return new Promise(res => res(error(request, {
                  code: 403,  // forbidden
                  json: {
                    success: false,
                    message: ['Provided authentication does not have privelege to access route.']
                  }
                })));
              }
            } else {
              return new Promise(res => res(error(request, {
                code: 403, // forbidden
                json: {
                  success: false,
                  message: ['Provided authentication was not valid.']
                }
              })));
            }
          } else {
            return new Promise(res => res(error(request, {
              code: 401, // unauthorized
              json: {
                success: false,
                message: ['Authentication was not provided for protected route.']
              }
            })));
          }
        }
      } else {
        return new Promise(res => res(error(request, {
          code: 405,  // method not allowed
          json: {
            success: false,
            message: ['Method not allowed.', `Provided route, '${request.route}' is ${route!.method} method.`]
          }
        })));
      }
    } else {
      return new Promise(res => res(error(request, {
        code: 404,  // not found
        json: {
          success: false,
          message: [`Provided route, '${request.route}' does not exist.`]
        }
      })));
    }
    
  } else {
    return new Promise(res => res(error(request, {
      code: 400,  // bad request
      json: {
        success: false,
        message: ['Route was not provided.']
      }
    })));
  }
}

export default router;