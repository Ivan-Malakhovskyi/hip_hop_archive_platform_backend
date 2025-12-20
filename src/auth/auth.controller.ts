import { Controller, Get, Post, Body, Res, HttpCode } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/crete-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInUserDTO } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @HttpCode(200)
  @Post('signin')
  async signin(
    @Body() userDTO: SignInUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signin(userDTO);
    const { password, ...rest } = userDTO;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      ...rest,
    };
  }

  @HttpCode(204)
  @Get('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');

    return { message: 'Signout success' };
  }
}
