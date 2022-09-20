import authentication, { AuthenticationService } from './authentication/authentication.service';
import router, { RouterService } from './router/router.service';
import validation, { ValidationService } from './validation/validation.service';

const services: {
  authentication: AuthenticationService,
  router: RouterService,
  validation: ValidationService
} = {
  authentication: authentication,
  router: router,
  validation: validation,
};

export default services;


