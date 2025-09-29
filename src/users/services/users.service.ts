import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {}


  async createUser(createUserDto: CreateUserDto) {
    const userEmail = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (userEmail) {
      throw new BadRequestException("Email já cadastrado");
    }

    return await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email
    });

  }


  findAll() {
    return this.userRepository.find()
  }


  async findOne(userID: string) {
    const user = await this.userRepository.findOneBy({ id: userID })
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }


  removeAllUsers() {
    this.userRepository.clear()
  }
}
