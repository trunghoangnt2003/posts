import { UserService } from './../user.service';
/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService,private userService:UserService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request  = context.switchToHttp().getRequest();
        try {
            // 1)  get token jwt from headers
            const token = request.headers.authorization.split(' ')[1];
            console.log(token);

            // 2) jwtVerify validate token
            if(!token){
                throw new ForbiddenException('Please provide access token');
            }
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.JWT_SECRET,
            });
            // 3) find user in database on jwtVerify
            console.log(payload);
            const user = await this.userService.findByEmail(payload.email);
            console.log(user);
            if(!user){
                throw new BadRequestException('User not found');
            }
            // 4) Assign user to request
            request.currentUser = user;
            return true;
        } catch (error) {
            console.log("error from auth guard",error);
        }
    }
}