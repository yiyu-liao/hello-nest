import config from '@src/config';

import { Module } from '@nestjs/common';
import WalletEntity from '@src/core/entities/wallet.entity';
import UserEntity from '@src/core/entities/user.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
const ENTITES = [UserEntity, WalletEntity];

import { UserService } from '@src/core/apis/user/user.service';
import { WeixinService } from '@src/core/apis/weixin/weixin.service';
import { UserController } from '@src/core/apis/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.orm as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([...ENTITES]),
  ],
  providers: [UserService, WeixinService],
  controllers: [UserController],
})
export class FeaturesModule {}
