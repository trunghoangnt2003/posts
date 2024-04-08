import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  @Exclude()
  User_Id: number;
 
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'User_Id', referencedColumnName: 'id' })
  @Transform(({ obj }) => obj.user.id)
  user: User;
}
