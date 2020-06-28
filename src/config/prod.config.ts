import { resolve } from 'path';

export default {
  port: 9527,

  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hello_nest',
    entities: [resolve('./**/*.entity.js')],
    migrations: ['migration/*.ts'],
    dropSchema: false,
    synchronize: false,
    logging: false,
  },
};
