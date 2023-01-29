import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import path from 'path';

import server from './server/server';

import { RouterResponse } from './server/services/router/router.service';
import db from './server/services/db/db.service';

import os from 'os';

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));
app.use('/api', async (request: express.Request, response: express.Response) => {
  
  let parsedRequest = await server.services.requestParser(request);

  if (parsedRequest.success && parsedRequest.body) {

    let routerResponse = await server.services.router(parsedRequest.body!);
    let res = routerResponse.body!;
  
    Object.keys(res.headers || {}).forEach(key => response.setHeader(key, res.headers![key]));

    console.log([
      ...(res.json?.messages || []),
      ...routerResponse.messages,
      ...parsedRequest.messages,
    ]);
    
    if (res.json) {

      //res.json.messages = [...res.json.messages, ... parsedRequest.messages];
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

  } else {
    console.log(parsedRequest.messages);
    response.status(400).json({
      success: false,
      messages: [...parsedRequest.messages]
    });
  }

});
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000, async () => {
  console.log(`CrudStore listening on port ${process.env.PORT || 3000}`);

  for (const key of Object.keys(server.models)) {
    console.log((await db.table.create(key, (<any>server.models)[key])).messages);
  }
  // console.log(await db.row.stream('user', 5, 3));

  console.log(os.hostname());
});