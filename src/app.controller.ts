import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { JWTAuthGuard } from './auth/jwt-guard';
import { User } from './users/user.entity';

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get<string>('JWT_SECRET'));
    return this.appService.getHello();
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getMe(@Req() request: { user: User }) {
    return request.user;
  }
}
