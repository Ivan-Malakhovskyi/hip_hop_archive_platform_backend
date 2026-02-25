import {
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/crete-user.dto';
import { SignInUserDTO } from 'src/auth/dto/signin-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    @Body() userDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    const isUserExist = await this.userRepository.findOneBy({
      email: userDTO.email,
    });

    if (isUserExist) {
      throw new ConflictException('User already exist');
    }

    const userSchema = new User();

    userSchema.firstName = userDTO.firstName;
    userSchema.lastName = userDTO.lastName;
    userSchema.email = userDTO.email;

    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);

    const user = await this.userRepository.save(userDTO);
    const { password, ...rest } = user;

    return rest;
  }

  async findOne(data: SignInUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
