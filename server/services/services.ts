import request, { RequestService } from './request/request.service';
import authentication, { AuthenticationService } from './authentication/authentication.service';
import router, { RouterService } from './router/router.service';
import validation, { ValidationService } from './validation/validation.service';

const services: {
  request: RequestService,
  authentication: AuthenticationService,
  router: RouterService,
  validation: ValidationService
} = {
  request: request,
  authentication: authentication,
  router: router,
  validation: validation,
};

export default services;


