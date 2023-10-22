import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.userService.create(dto);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  @Get(':id/rooms')
  async getUserRooms(@Param('id') id: string) {
    return await this.userService.getUserRooms(id);
  }
}
