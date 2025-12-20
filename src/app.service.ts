import { Get, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DevConfigService } from './providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private readonly devConfigService: DevConfigService,
    private readonly configService: ConfigService,

    @Inject('CONFIG')
    private config: { port: string },
  ) {}

  @Get()
  getHello(): string {
    return `Server is running on the ${process.env.NODE_ENV === 'development' ? this.devConfigService.getDB_HOST() : 'PROD HOISTING'} `;
  }
}
