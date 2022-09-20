import jwt, { } from 'jsonwebtoken';
import crypto from 'crypto';
import server from '../../server';

export type AuthenticationService = {
  generateToken: (data: Object) => string,
  verifyToken: (token: string) => boolean,
  decodeToken: (token: string) => any | null,
  generateTimeToken: (data: Object | null) => string,
  verifyTimeToken: (data: Object | null, token: string, ttlMinutes?: number) => boolean
}

export default {
  'generateToken': (data: Object): string => jwt.sign(data, server.config.SERVER_SECRET),
  'verifyToken': (token: string): boolean => {
    try {
      let decoded = jwt.verify(token, server.config.SERVER_SECRET);
    } catch { return false }
    return true;
  },
  'decodeToken': (token: string): any | null => {
    try {
      let decoded = jwt.verify(token, server.config.SERVER_SECRET);
      return decoded;
    } catch { return null }
  },
  'generateTimeToken': (data: Object | null): string => { 
    let now = Math.floor(Date.now() / 60000);
    now = now - (now % 10);
    let payload = now.toString() + server.config.SERVER_SECRET;
    if (data) { payload = JSON.stringify(data) + payload; }
    return crypto.createHash('md5').update(payload).digest('hex').substring(0, 6);
  },
  'verifyTimeToken': (data: Object | null, token: string, ttlMinutes?: number): boolean => {
    let ttl = 10;
    let now = Math.floor(Date.now() / 60000);
    now = now - (now % 10);
    let payload = now.toString() + server.config.SERVER_SECRET;
    if (data) { payload = JSON.stringify(data) + payload; }

    if (ttlMinutes && ttlMinutes > 10) {
      ttl = ttlMinutes;
    }
    let verified = false;
    let nowhash = "";
    while (ttl > 0) {
      nowhash = crypto.createHash('md5').update(payload).digest('hex').substring(0, 6);
      if (nowhash === token) { verified = true; }
      ttl -= 10;
      now -= 10;
    }
    return verified;
  }
}