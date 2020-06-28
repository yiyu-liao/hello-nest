import * as _ from 'lodash';
import { resolve } from 'path';

import productionConfig from './prod.config';

export const isProd = process.env.NODE_ENV === 'production';
export const isUat = process.env.NODE_ENV === 'uat';

let config = {
  api_prefix: 'api',

  port: 3000,
  hostname: 'localhost',

  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hello_nest',
    entities: [resolve('./**/*.entity.{js, ts}')],
    migrations: ['migration/*.ts'],
    timezone: 'UTC',
    charset: 'utf8mb4',
    multipleStatements: true,
    dropSchema: false,
    synchronize: true,
    logging: false,
  },


  jwt: {
    secert: 'secertKey',
    signOptions: {
      expiresIn: 60 * 60 * 24 * 30,
    },
  },
};

if (isProd) {
  config = _.merge(config, productionConfig);
}

export { config };
export default config;
