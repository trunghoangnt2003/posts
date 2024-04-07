/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';
import { ROLES } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password:string;

    role:ROLES;
}
