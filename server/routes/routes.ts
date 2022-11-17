import avatarlistRoute from './avatarlist/avatarlist.route';
import avatarlistSchema from './avatarlist/avatarlist.schema';
import loginRoute from './login/login.route';
import loginSchema from './login/login.schema';
import registerRoute from './register/register.route';
import registerSchema from './register/register.schema';
import { ParsedRequest } from "../services/requestParser/requestParser.service";
import { RouterResponse } from "../services/router/router.service";

export interface Route {
  method: string[],
  contentType: string,
  privelege: string[],
  schema: any,
  route: (request: ParsedRequest) => Promise<RouterResponse>
}

const routes: { [key: string]: Route } = {
 avatarlist: {
    method: ['GET'],
    contentType: "application/json",
    privelege: ['guest'],
    schema: avatarlistSchema,
    route: avatarlistRoute 
  },
 login: {
    method: ["POST"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: loginSchema,
    route: loginRoute 
  },
 register: {
    method: ["POST"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: registerSchema,
    route: registerRoute 
  },
}

export default routes;