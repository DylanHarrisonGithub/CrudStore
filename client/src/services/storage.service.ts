import config from '../config/config.json';

const StorageService = {
  session: {
    store: (key: string, value: any): void => {
      let storage = sessionStorage.getItem(config.APP_NAME);
      let storageObj: any = {};
      if (storage) { storageObj = JSON.parse(storage); }
      storageObj[key] = value;
      sessionStorage.setItem(config.APP_NAME, JSON.stringify(storageObj));
    },
    retrieve: (key: string): any => { 
      let storage = sessionStorage.getItem(config.APP_NAME);
      if (storage) { return JSON.parse(storage)[key]; } else { return undefined; }
    }
  },
  local: {
    store: (key: string, value: any): void => {
      let storage = localStorage.getItem(config.APP_NAME);
      let storageObj: any = {};
      if (storage) { storageObj = JSON.parse(storage); }
      storageObj[key] = value;
      localStorage.setItem(config.APP_NAME, JSON.stringify(storageObj));
    },
    retrieve: (key: string): any => { 
      let storage = localStorage.getItem(config.APP_NAME);
      if (storage) { return JSON.parse(storage)[key]; } else { return undefined; }
    }
  },
  cookie: {
    store: (key: string, value: any) => {
      console.log('storage.service.ts: cookie service not yet implemented!');
      // let storage = this._cookieService.get(config.APP_NAME);
      // let storageObj: any = {};
      // if (storage) { storageObj = JSON.parse(storage); }
      // storageObj[key] = value;
      // this._cookieService.set(config.APP_NAME, JSON.stringify(storageObj));
    },
    retrieve: (key: string) => { 
      console.log('storage.service.ts: cookie service not yet implemented!');
      // let storage = this._cookieService.get(config.APP_NAME);
      // if (storage) { return JSON.parse(storage)[key]; } else { return undefined; }
      return '';
    }
  },
  window: {
    store: (key: string, value: any): void => { (<any>window)[config.APP_NAME][key] = value; },
    retrieve: (key: string): any => { return (<any>window)[config.APP_NAME][key]; }
  }
}

export default StorageService;
