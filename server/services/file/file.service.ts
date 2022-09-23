import fs = require('fs');

import server from '../../server';

const file = {
  exists: (filepath: string) => new Promise<boolean>(r=>fs.access(server.config.ROOT_DIR + filepath, fs.constants.F_OK, (e:any) => r(!e))),
  create:  (filepath: string, content: string) => new Promise<string>((res, rej) => {
    fs.writeFile(server.config.ROOT_DIR + filepath, content, (err: any) => {
      if (err) { rej(err); } else { res('File created.'); }
    });
  }),
  read:  (filepath: string) => new Promise<string>((res,rej) => {
    fs.readFile(server.config.ROOT_DIR + filepath, "utf8", (err: any, file: string) => {
      if (err) { rej(err); } else  {res(file); }
    });
  }),
  update:  (filepath: string, content: string) => new Promise<string>((res, rej) => {
    fs.appendFile(server.config.ROOT_DIR + filepath, content, (err: any) => {
      if (err) { rej(err); } else { res('File updated.'); }
    });
  }),
  delete:  (filepath: string) => new Promise<string>((res, rej) => {
    fs.unlink(server.config.ROOT_DIR + filepath, (err: any) => {
      if (err) { rej(err); } else { res('File deleted.'); }
    });
  }),
  move:  (srcpath: string, destpath: string) => new Promise<string>((res, rej) => {
    fs.rename(server.config.ROOT_DIR + srcpath, server.config.ROOT_DIR +  destpath, (err: any) => {
      if (err) { rej(err); } else { res('File moved successfully.'); }
    });
  }),
  readDirectory: (path: string): Promise<string[]> => {
    return new Promise((res, rej) => {
      fs.readdir(server.config.ROOT_DIR + path, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) { rej(err); } else { res(files); }
      });
    });
  },
  createDirectory: (path: string): Promise<string> => {
    return new Promise((res, rej) => {
      fs.mkdir(server.config.ROOT_DIR + path, { recursive: true }, err => {
        if (err) { rej(err); } else { res('Directory created successfully.'); }
      });
    });
  },
  deleteDirectory: (path: string): Promise<string> => {
    return new Promise((res, rej) => {
      fs.rmdir(server.config.ROOT_DIR + path, { recursive: true }, err => {
        if (err) { rej(err); } else { res('Directory deleted successfully.'); }
      });
    });
  }
}
export default file;