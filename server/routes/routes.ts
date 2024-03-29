import productsRoute from './products/products.route';
import productsSchema from './products/products.schema';
import productcreateRoute from './productcreate/productcreate.route';
import productcreateSchema from './productcreate/productcreate.schema';
import userdeleteRoute from './userdelete/userdelete.route';
import userdeleteSchema from './userdelete/userdelete.schema';
import userupdateRoute from './userupdate/userupdate.route';
import userupdateSchema from './userupdate/userupdate.schema';
import userlistRoute from './userlist/userlist.route';
import userlistSchema from './userlist/userlist.schema';
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
import { Schema } from '../services/validation/validation.service';

export interface Route {
  method: string[],
  contentType: string,
  privilege: string[],
  schema: Schema,
  route: (request: ParsedRequest) => Promise<RouterResponse>
}

const routes: { [key: string]: Route } = {
 products: {
    method: ['GET'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: productsSchema,
    route: productsRoute 
  },
 productcreate: {
    method: ['POST'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: productcreateSchema,
    route: productcreateRoute 
  },
 userdelete: {
    method: ['DELETE'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: userdeleteSchema,
    route: userdeleteRoute 
  },
 userupdate: {
    method: ['PATCH'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: userupdateSchema,
    route: userupdateRoute 
  },
 userlist: {
    method: ['GET'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: userlistSchema,
    route: userlistRoute 
  },
 uploadproductimage: {
    method: ["POST"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: uploadproductimageSchema,
    route: uploadproductimageRoute 
  },
 deleteproductimage: {
    method: ["DELETE"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: deleteproductimageSchema,
    route: deleteproductimageRoute 
  },
 productimagelist: {
    method: ["GET"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: productimagelistSchema,
    route: productimagelistRoute 
  },
 deleteavatar: {
    method: ["DELETE"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: deleteavatarSchema,
    route: deleteavatarRoute 
  },
 uploadavatar: {
    method: ["POST"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: uploadavatarSchema,
    route: uploadavatarRoute 
  },
 avatarlist: {
    method: ['GET'],
    contentType: "application/json",
    privilege: ['guest'],
    schema: avatarlistSchema,
    route: avatarlistRoute 
  },
 login: {
    method: ["POST"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: {}, //loginSchema,
    route: loginRoute 
  },
 register: {
    method: ["POST"],
    contentType: "application/json",
    privilege: ['guest'],
    schema: registerSchema,
    route: registerRoute 
  },
}

export default routes;