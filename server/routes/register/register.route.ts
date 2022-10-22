import { RouterResponse } from '../../services/router/router.service';
import DB from '../../services/db/db.service';
import authentication from '../../services/authentication/authentication.service';
import crypto from 'crypto';

export default async (request: any): Promise<RouterResponse> => {

  const {email, password}: {email: string, password: string} = request;

  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 32, 64, 'sha512').toString('hex');

  // DB.create('user', { email: email, privilege: 'user', password: hash, salt: salt }).then(res => {
  //   return { 
  //     code: 200, 
  //     json: { 
  //       success: true, 
  //       message: [`New user ${email} registered.`],
  //       body: { token: authentication.generateToken({email: email, privilege: 'user'})}
  //     } 
  //   }
  // }).catch(e => {
  //   return { 
  //     code: 200, 
  //     json: { 
  //       success: false, 
  //       message: [e]
  //     } 
  //   }
  // });

  const res = await DB.create('user', { email: email, privilege: 'user', password: hash, salt: salt });
  
  if (res.success) {
    return { 
      code: 200, 
      json: { 
        success: true, 
        message: [`New user ${email} registered.`],
        body: { token: authentication.generateToken({email: email, privilege: 'user'}) }
      } 
    }
  } else {
    return { 
      code: 200, 
      json: { 
        success: true, 
        message: [`New user ${email} registered.`],
        body: { token: authentication.generateToken({email: email, privilege: 'user'}) }
      } 
    }
  }
  
  
};