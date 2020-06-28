import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '@src/core/apis/user/user.service';
import UserEntity from '@src/core/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth')
  async authSession(
    @Body('js_code') jsCode: string,
    @Body('profile') profile: unknown,
  ): Promise<UserEntity> {
    return await this.userService.authSession(jsCode, profile);
  }

  @Get('/detail')
  async getUserDetail(@Param('user_id') userId: number): Promise<UserEntity> {
    return await this.userService.getUserDetail(userId);
  }

  @Post('/update')
  async updateUserInfo(
    @Body('user_id') userId: number,
    @Body('user_info') userInfo: Partial<UserEntity>,
  ): Promise<null> {
    return await this.userService.updateUserInfo(userId, userInfo);
  }
}
