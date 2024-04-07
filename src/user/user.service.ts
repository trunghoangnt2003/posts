/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { Permissions } from './helper/Permission.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  create(
    
    createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
  register(
    
    createUserDto: RegisterUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
  
  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }
  findByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }
  async update(id: number, updateUserDto: UpdateUserDto , currentUser: User) {
      if(updateUserDto.role){
        throw new BadRequestException('dont update role user');
      }

      const user = await this.findOne(id);
      if(!user){
        throw new Error('User not found');
      }
      Permissions.check(id,currentUser);
      // hash password
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(updateUserDto.password,saltOrRounds);
      updateUserDto.password = hashPassword;
      return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
