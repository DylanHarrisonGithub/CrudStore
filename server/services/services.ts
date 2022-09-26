import db from './db/db.service';
import file from './file/file.service';
import requestParser from './requestParser/requestParser.service';
import authentication from './authentication/authentication.service';
import router from './router/router.service';
import validation from './validation/validation.service';

const services = {
  db: db,
  file: file,
  authentication: authentication,
  requestParser: requestParser,
  router: router,
  validation: validation
};

export default services;


