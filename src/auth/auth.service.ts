import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
