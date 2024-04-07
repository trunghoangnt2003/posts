/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
export class Permissions{
    static check(id:number,currentUser:User){
        if(id === currentUser.id) return;
        if(currentUser.role === 'ADMIN' ) return;

        throw new BadRequestException('Cant performance');
    }
}