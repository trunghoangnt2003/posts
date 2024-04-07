/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum ROLES {
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

    @OneToMany(() => Post,(post) => post.user) 
    posts : Post[];
} 
