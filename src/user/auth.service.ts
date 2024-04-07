/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,private userService:UserService){}

    async register(requestsBody : RegisterUserDto){
        const user = await this.userService.findByEmail(requestsBody.email);
        if(user){
            throw new BadRequestException('Email already registered');
        }

        // hash password
        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(requestsBody.password,saltOrRounds);
        requestsBody.password = hashPassword;
        // save to db
        const saveUser=await this.userService.register(requestsBody);

        // generate jwt
        const payload = {
            id : saveUser.id,
            role:saveUser.role 
        }
        const access_token= await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_SECRET,
        });
        return {
            msg : "User has been created!",
            access_token
        }
    }

    async login(requestsBody : LoginUserDto){
        const userByEmail = await this.userService.findByEmail(requestsBody.email);
        if(!userByEmail) {
            throw new BadRequestException('User not found');
        }

        // check pass word

        const isMatch = await bcrypt.compare(requestsBody.password,userByEmail.password);
        if(!isMatch){
            throw new BadRequestException('Invalid password');
        }
        // generate jwt
        const payload = {
            id : userByEmail.id,
            email: userByEmail.email,
            role:userByEmail.role 
        }
        const access_token= await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_SECRET,
        });
        return {
            msg : "User has been login!",
            access_token
        }
    }
}