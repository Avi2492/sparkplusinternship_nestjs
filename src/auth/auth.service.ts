/* eslint-disable prettier/prettier */

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const usernameCheck = await this.usersRepository.findOneBy({ username });

    if (usernameCheck) {
      throw new ConflictException(
        `Username is ALready taken ${username} Please try to create different one`,
      );
    }

    // const emailCheck = await this.usersRepository.findOneBy({ email });

    // if (emailCheck) {
    //   throw new ConflictException(
    //     `Email "${email}" is already registered. Please use a different one.`,
    //   );
    // }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcryptjs.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
