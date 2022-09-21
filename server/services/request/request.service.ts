import express from 'express';
import url = require('url');

export type ParsedRequest = {
  ip: string,
  timestamp: number,
  method: string,
  route: string,
  token: any,
  params: any,
  files: any
}

export type RequestService = (req: express.Request) => ParsedRequest;


export default (req: express.Request) => {

  let token = null;
  if (req.cookies['token']) { token = req.cookies.token };
  if (!token && req.headers['token']) { token = req.headers.token };
  
  let route = "";
  if (req.url) {
    let parsed = url.parse(req.url).pathname;
    if (parsed) {
      route = parsed.split('/').join('-').substr(1);
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
    route: route,
    token: token,
    params: req.method === 'GET' ? req.query : req.body,
    files: req.files
  }
}