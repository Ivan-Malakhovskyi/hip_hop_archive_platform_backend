import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { DevConfigService } from './providers/DevConfigService';
import { ConfigModule } from '@nestjs/config';

const devConfig = {
  port: 3000,
};

const prodConfig = {
  port: 4000,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // envFilePath: 'env',
      // load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.NODE_ENV === 'development'
          ? process.env.DB_URL_DEV
          : process.env.DB_URL_PROD,
      // database: process.env.DB_NAME,
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT!) || 3306,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User],
      synchronize: true,
      ssl: {
        rejectUnauthorized:
          process.env.NODE_ENV === 'development' ? false : true,
      },
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
      },
    },
  ],
})
export class AppModule {}
