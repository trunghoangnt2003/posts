/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { currentUser } from './decorator/user.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { User } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService:AuthService) {}

  @UseGuards(new RolesGuard(["ADMIN"]))
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    console.log("Get all users");
    return this.userService.findAll();
  }
  //@UseGuards(AuthGuard)
  @Get('currentUser')
  getCurrentUser(@currentUser() user) {
    return user;;
  } 
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }
  @UseGuards(new RolesGuard(["ADMIN","USER"]))
  @UseGuards(AuthGuard) 
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number , @Body() updateUserDto: UpdateUserDto, @currentUser() user: User) {
    return this.userService.update(+id, updateUserDto,user);
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
