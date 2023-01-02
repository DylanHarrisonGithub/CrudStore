import { RouterResponse } from '../../services/router/router.service';
import DB from '../../services/db/db.service';
import authentication from '../../services/authentication/authentication.service';
import crypto from 'crypto';

export default async (request: any): Promise<RouterResponse<{ token: string }>> => {

  const {email, password}: {email: string, password: string} = request.params;

  const salt = crypto.randomBytes(32).toString('hex');
  const hash = await crypto.pbkdf2Sync(password, salt, 32, 64, 'sha512').toString('hex');

  const res = await DB.row.create('user', { email: email, privilege: 'user', password: hash, salt: salt, avatar: `https://avatars.dicebear.com/api/male/john.svg?background=%230000ff` });
  
  if (res.success) {
    return new Promise(resolve => resolve({ 
      code: 200, 
      json: { 
        success: true, 
        messages: [
          `SERVER - ROUTES - REGISTER - New user ${email} registered.`
        ].concat(res.messages),
        body: { token: authentication.generateToken({email: email, privilege: 'user', dummy: ""}) }
      } 
    }));
  } else {
    return new Promise(resolve => resolve({ 
      code: 500, 
      json: { 
        success: false, 
        messages: [`SERVER - ROUTES - REGISTER - User ${email} could not be registered.`].concat(res.messages)
      } 
    }));
  }

};