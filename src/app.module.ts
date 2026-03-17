import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevConfigService } from './providers/DevConfigService';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import configuration from './config/configuration';

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
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // process.env.NODE_ENV === 'development'
      //   ? process.env.DATABASE_PUBLIC_URL
      //   : process.env.DATABASE_URL,
      // database: process.env.DB_NAME,
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT!),
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development' ? true : false,

      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      retryDelay: 3000,
      retryAttempts: 5,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    SongsModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
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
