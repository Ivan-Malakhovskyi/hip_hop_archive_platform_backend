import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { SignInUserDTO } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(signinDTO: SignInUserDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(signinDTO);

    const isPasswordUserMatched = await bcryptjs.compare(
      signinDTO.password,
      user.password,
    );

    if (!isPasswordUserMatched) {
      throw new UnauthorizedException("Password doesn't match");
    } else {
      const { password, ...rest } = user;

      const payload = { email: rest.email, sub: rest.id };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }

  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');

    return { success: true };
  }
}
