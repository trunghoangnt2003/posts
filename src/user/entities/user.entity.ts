/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
enum ROLES {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
@Entity({name:"user"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password:string;

    @Exclude()
    @Column({default: ROLES.USER})
    role:ROLES;
} 
