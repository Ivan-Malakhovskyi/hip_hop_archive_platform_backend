import { Get, Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './providers/DevConfigService';
import { ConfigService } from '@nestjs/config';

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
    return `Server is running on the ${this.devConfigService.getDB_HOST()} PORT IS ${this.config.port} and ${this.configService.get<string>('JWT_SECRET')}`;
  }
}
