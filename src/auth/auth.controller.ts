import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDTO } from 'src/users/dto/crete-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInUserDTO } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO) {
    console.log('SSSS');
    return this.userService.createUser(userDTO);
  }

  @Post('signin')
  signin(@Body() userDTO: SignInUserDTO) {
    return this.authService.signin(userDTO);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
