/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    id: number;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password:string;
}
