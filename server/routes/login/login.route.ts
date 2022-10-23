import { RouterResponse } from '../../services/router/router.service';
import DB from '../../services/db/db.service';
import authentication from '../../services/authentication/authentication.service';
import crypto from 'crypto';

export default async (request: any): Promise<RouterResponse> => {

  const {email, password}: {email: string, password: string} = request.params;

  const res = await DB.row.read('user', { email: email });

  if (!res.success) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        message: [`Server or Database error attempting to login user ${email}.`].concat(res.message)
      } 
    }));
  }

  if (!(res.result && res.result.length)) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        message: [`User ${email} not found.`].concat(res.message)
      } 
    }));
  }

  const salt = res.result[0].salt;
  const hash = await crypto.pbkdf2Sync(password, salt, 32, 64, 'sha512').toString('hex');

  if (!(hash === res.result[0].password)) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        message: [`Password did not match for user ${email}.`].concat(res.message)
      } 
    }));
  }

  return new Promise(resolve => resolve({ 
    code: 200, 
    json: { 
      success: true, 
      message: [`User ${email} successfully logged in.`],
      body: { token: authentication.generateToken({email: email, privilege: res.result[0].privilege}) }
    } 
  })); 

};