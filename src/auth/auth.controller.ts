import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  Inject,
  forwardRef,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/crete-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInUserDTO } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTAuthGuard } from './jwt-guard';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    const user = await this.userService.createUser(userDTO);

    console.log('🚀 ~ AuthController ~ signup ~ user:', user);
    // const { accessToken } = await this.authService.signin(user);

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    console.log('🚀 ~ AuthController ~ signup ~ accessToken:', accessToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send(user);
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

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getMe(@Req() request: { user: User }) {
    return request.user;
  }
}
