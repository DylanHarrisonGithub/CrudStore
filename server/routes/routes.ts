import uploadproductimageRoute from './uploadproductimage/uploadproductimage.route';
import uploadproductimageSchema from './uploadproductimage/uploadproductimage.schema';
import deleteproductimageRoute from './deleteproductimage/deleteproductimage.route';
import deleteproductimageSchema from './deleteproductimage/deleteproductimage.schema';
import productimagelistRoute from './productimagelist/productimagelist.route';
import productimagelistSchema from './productimagelist/productimagelist.schema';
import deleteavatarRoute from './deleteavatar/deleteavatar.route';
import deleteavatarSchema from './deleteavatar/deleteavatar.schema';
import uploadavatarRoute from './uploadavatar/uploadavatar.route';
import uploadavatarSchema from './uploadavatar/uploadavatar.schema';
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
 uploadproductimage: {
    method: ["POST"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: uploadproductimageSchema,
    route: uploadproductimageRoute 
  },
 deleteproductimage: {
    method: ["DELETE"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: deleteproductimageSchema,
    route: deleteproductimageRoute 
  },
 productimagelist: {
    method: ["GET"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: productimagelistSchema,
    route: productimagelistRoute 
  },
 deleteavatar: {
    method: ["DELETE"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: deleteavatarSchema,
    route: deleteavatarRoute 
  },
 uploadavatar: {
    method: ["POST"],
    contentType: "application/json",
    privelege: ['guest'],
    schema: uploadavatarSchema,
    route: uploadavatarRoute 
  },
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