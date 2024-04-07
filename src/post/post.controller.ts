import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { currentUser } from 'src/user/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @currentUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
