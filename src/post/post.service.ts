import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Permissions } from 'src/helper/Permission.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  create(createPostDto: CreatePostDto, user: User) {
    const post = this.postRepository.create(createPostDto);
    post.user = user;
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.findOne(id);
    console.log('post item: ', post.User_Id);
    debugger;
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // const postDB = await this.postRepository
    //   .createQueryBuilder('post')
    //   .innerJoin('post.user', 'user')
    //   .where('post.id = :idPost', { idPost: id })
    //   .getOne();
    //const userInPost = await this.userService.findByIdPost(id);
    Permissions.check(post.User_Id, user);
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
