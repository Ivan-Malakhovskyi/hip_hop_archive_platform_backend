import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,

    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req) => req?.cookies?.accessToken,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'FFF',
    });
  }

  async validate(payload: any) {
    const userInDB = await this.usersService.findOne(payload?.sub);
    const { lastName, firstName } = userInDB;

    return { userId: payload.sub, email: payload.email, lastName, firstName };
  }
}
