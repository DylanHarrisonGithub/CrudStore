import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import path from 'path';

import pg from 'pg';

import server from './server/server';

import { RouterResponse } from 'server/services/router/router.service';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));
app.use('/api', (request: express.Request, response: express.Response) => {
  let res: RouterResponse = server.services.router(server.services.request(request));
  console.log(res);
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