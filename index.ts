import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import path from 'path';

import pg from 'pg';

import server from './server/server';

import { RouterResponse } from './server/services/router/router.service';


import { negotiateCompatibleResponseContentType } from './server/services/router/router.service';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));
app.use('/api', (request: express.Request, response: express.Response) => {
  let pRequest = server.services.requestParser(request);
  console.log(pRequest);
  let res: RouterResponse = server.services.router(server.services.requestParser(request));
  console.log(res);
  Object.keys(res.headers || {}).forEach(key => response.setHeader(key, res.headers![key]));
  if (res.json) {
    response.status(res.code).json(res.json);
  } else if (res.html) {
    response.status(res.code).send(res.html);
  } else if (res.filename) {
    response.status(res.code).sendFile(res.filename);
  } else if (res.redirect) {
    response.redirect(res.redirect);
  } else {
    response.sendStatus(res.code);
  }
});
app.use(express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000, () => {
  console.log(`CrudStore listening on port ${process.env.PORT || 3000}`);
  if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    if (pool) {
      console.log(`Successfully connected to Postgres database.`);
    } else {
      console.log(`Could not connect to database. DATABASE_URL environtment variable may be set incorrectly.`)
    }
  } else {
    console.log(`Could not connect to database. DATABASE_URL environment variable not set.`);
  }

});