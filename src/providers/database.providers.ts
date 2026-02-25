import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',

    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        // url: process.env.DB_URL,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // ssl: false,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      });

      return dataSource.initialize();
    },
  },
];
