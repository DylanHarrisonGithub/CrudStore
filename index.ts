import express from 'express';
import cors from 'cors';
import path from 'path';

import pg from 'pg';

const app = express();

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