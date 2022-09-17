import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000, () => console.log(`CrudStore listening on port ${process.env.PORT || 3000}`));