import config from '../config/config.json';

export class StorageService {

  private mem: any = {};
  //private _cookieService: CookieService;

  constructor() { }

  public session: { 
    store: (key: string, value: any) => void,
    retrieve: (key: string) => any | undefined
  } = {
    store: (key: string, value: any) => {
      let storage = sessionStorage.getItem(config.APP_NAME);
      let storageObj: any = {};
      if (storage) { storageObj = JSON.parse(storage); }
      storageObj[key] = value;
      sessionStorage.setItem(config.APP_NAME, JSON.stringify(storageObj));
    },
    retrieve: (key: string) => { 
      let storage = sessionStorage.getItem(config.APP_NAME);
      if (storage) { return JSON.parse(storage)[key]; } else { return undefined; }
    }
  }

  public local: { 
    store: (key: string, value: any) => void,
    retrieve: (key: string) => any | undefined
  } = {
    store: (key: string, value: any) => {
      let storage = localStorage.getItem(config.APP_NAME);
      let storageObj: any = {};
      if (storage) { storageObj = JSON.parse(storage); }
      storageObj[key] = value;
      localStorage.setItem(config.APP_NAME, JSON.stringify(storageObj));
    },
    retrieve: (key: string) => { 
      let storage = localStorage.getItem(config.APP_NAME);
      if (storage) { return JSON.parse(storage)[key]; } else { return undefined; }
    }
  }

  public cookie: { 
    store: (key: string, value: any) => void,
    retrieve: (key: string) => any | undefined
  } = {
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
    }
  }

  public memory: { 
    store: (key: string, value: any) => void,
    retrieve: (key: string) => any | undefined
  } = {
    store: (key: string, value: any) => { this.mem[key] = value; },
    retrieve: (key: string) => { return this.mem[key]; }
  }
}
