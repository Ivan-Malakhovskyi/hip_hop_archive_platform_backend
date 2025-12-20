import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',

    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url:
          process.env.NODE_ENV === 'development'
            ? process.env.DB_URL_DEV
            : process.env.DB_URL_PROD,
        // host: process.env.DB_HOST,
        // port: Number(process.env.DB_PORT),
        // username: process.env.DB_ROOT,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
