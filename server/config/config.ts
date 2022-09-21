import path from 'path';

const config = {
  SERVER_SECRET: process.env.SERVER_SECRET || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  APPNAME: 'myMeanMachineApp',
  ENVIRONMENT: 'DEVELOPMENT',
  SOCKET_CONNECT_PRIVELEGE: ['guest', 'user', 'admin'],
  ROOT_DIR: path.normalize(__dirname + `/../../`),
  PORT: process.env.PORT || 3000,
}

export default config;