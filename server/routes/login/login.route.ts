import { RouterResponse } from '../../services/router/router.service';
import DB from '../../services/db/db.service';
import authentication from '../../services/authentication/authentication.service';
import crypto from 'crypto';

import { User } from '../../models/models';

export default async (request: any): Promise<RouterResponse> => {

  const {email, password}: {email: string, password: string} = request.params;

  const res = await DB.row.read<User[]>('user', { email: email });

  if (!res.success) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        messages: [
          `SERVER - ROUTES - LOGIN - Server or Database error attempting to login user ${email}.`
        ].concat(res.messages)
      } 
    }));
  }

  if (!(res.body && res.body.length)) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        messages: [`SERVER - ROUTES - LOGIN - User ${email} not found.`].concat(res.messages)
      } 
    }));
  }

  const salt = res.body[0].salt;
  const hash = await crypto.pbkdf2Sync(password, salt, 32, 64, 'sha512').toString('hex');

  if (!(hash === res.body[0].password)) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        messages: [`SERVER - ROUTES - LOGIN - Password did not match for user ${email}.`].concat(res.messages)
      } 
    }));
  }

  const token = await authentication.generateToken({email: email, privilege: res.body![0].privilege});

  if (!token.success) {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        messages: [`SERVER - ROUTES - LOGIN - Failed to generate token for user ${email}.`].concat(res.messages).concat(token.messages)
      } 
    }));
  }

  return new Promise(resolve => resolve({
    code: 200, 
    json: { 
      success: true, 
      messages: [`SERVER - ROUTES - LOGIN - User ${email} successfully logged in.`].concat(res.messages).concat(token.messages),
      body: { token: token.body! }
    } 
  })); 

};