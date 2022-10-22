import { RouterResponse } from '../../services/router/router.service';
import DB from '../../services/db/db.service';
import authentication from '../../services/authentication/authentication.service';
import crypto from 'crypto';

export default async (request: any): Promise<RouterResponse> => {

  const {email, password}: {email: string, password: string} = request.params;

  const salt = crypto.randomBytes(32).toString('hex');
  const hash = await crypto.pbkdf2Sync(password, salt, 32, 64, 'sha512').toString('hex');

  const res = await DB.row.create('user', { email: email, privilege: 'user', password: password, salt: salt });
  
  if (res.success) {
    return new Promise(resolve => resolve({ 
      code: 200, 
      json: { 
        success: true, 
        message: [`New user ${email} registered.`],
        body: { token: authentication.generateToken({email: email, privilege: 'user', dummy: ""}) }
      } 
    }));
  } else {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        message: [`User ${email} could not be registered.`],
        body: { res: res } //authentication.generateToken({email: email, privilege: 'user'}) }
      } 
    }));
  }

};