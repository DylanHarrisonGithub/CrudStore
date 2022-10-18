import config from '../config/config';

const StorageService = {
  SESSION: {
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
  LOCAL: {
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
  COOKIE: {
    store: (key: string, value: any) => {
      let storage: any = (<any>document.cookie
        .split(';')
        .map(c => c.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: JSON.parse(btoa(value))}), {}))
        [config.APP_NAME] || {};

      storage[key] = value;

      document.cookie = config.APP_NAME+'='+atob(JSON.stringify(storage));
    },
    retrieve: (key: string): any => { 
      return (<any>document.cookie
      .split(';')
      .map(c => c.split('='))
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: JSON.parse(btoa(value))}), {}))
      [config.APP_NAME]?.[key];
    }
  },
  WINDOW: {
    store: (key: string, value: any): void => { (<any>window)[config.APP_NAME][key] = value; },
    retrieve: (key: string): any => { return (<any>window)[config.APP_NAME][key]; }
  }
}

export default StorageService;
