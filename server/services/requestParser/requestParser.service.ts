import express from 'express';
import url = require('url');

export type ParsedRequest = {
  ip: string,
  timestamp: number,
  method: string,
  accepts: string,
  route: string,
  token: any,
  params: any,
  files: any
}

const requestParser = (req: express.Request): ParsedRequest => {
  let token = null;
  if (req.cookies['token']) { token = req.cookies.token };
  if (!token && req.headers['token']) { token = req.headers.token };
  
  let route = "";
  if (req.url) {
    let parsed = url.parse(req.url).pathname;
    if (parsed) {
      route = parsed.split('/').join('-').substring(1);
      if (route.startsWith('api/')) {
        route = route.substring(4);
      }
    }
  }

  let ip = '';
  if (Array.isArray(req.headers['x-forwarded-for'])) {
    ip = (<string[]>(req.headers['x-forwarded-for']))[0];
  } else {
    ip = <string>(req.headers['x-forwarded-for']);
  }
  if (req.socket.remoteAddress) {
    ip = ip || (<string>(req.socket.remoteAddress));
  }
  
  return {
    ip: ip,
    timestamp: Date.now(),
    method: req.method,
    accepts: req.get('Accept') || '', //req.get('Accept')?.split(',').map(type => type.indexOf(';') > -1 ? type.substring(0, type.lastIndexOf(';')).split('/') : type.split('/') ) || [],
    route: route,
    token: token,
    params: req.method === 'GET' ? req.query : req.body,
    files: req.files
  }
}

export default requestParser;