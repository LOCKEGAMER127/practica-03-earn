import { ConflictException,NotFoundException, Injectable, UnauthorizedException,} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtservice: JwtService){}

  async create(CreateUserDto: CreateUserDto) {
    const numRounds = 10;
    const { email, password } = CreateUserDto;

    const emailExists = await this.userRepository.findOneBy({email});

    if(emailExists) {
      const error = {
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict'
      }
      throw new ConflictException(error);
    }

    const hashedPassword = await bcrypt.hash(password, numRounds);
    CreateUserDto.password = hashedPassword;

    return await this.userRepository.save(CreateUserDto);
  }

  async login(loginUserDto: LoginUserDto) {

    const numRounds = 10;
    const { email, password } = loginUserDto;

    const emailExists = await this.userRepository.findOneBy({email});

    if(!emailExists) {
      const error = {
        statusCode: 404,
        message: 'Email not found',
        error: 'Not Found'
      }
      throw new NotFoundException(error);
    }

    const matchPassword = await bcrypt.compare(password, emailExists.password);
    
    if(!matchPassword) {
      const error = {
        statusCode: 401,
        message: 'Invalid password',
        error: 'Unauthorized'
      };
      throw new UnauthorizedException(error)
    }
    return await this.generateToken(emailExists.id);
  }

  private async generateToken(userId) {
    const accessToken = await this.jwtservice.sign({userId});
    return { accessToken};
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
