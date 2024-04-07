/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorator/user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService:AuthService) {}


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    console.log("Get all users");
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('currentUser')
  getCurrentUser(@User() user) {
    return user;;
  }
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
  @Post('register')
  register(@Body() request:RegisterUserDto){
    return this.authService.register(request);
  }
  @Post('/login')
  login(@Body() request:LoginUserDto){
    return this.authService.login(request);
  }
}
