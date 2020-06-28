import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import WalletEntity from '@src/core/entities/wallet.entity';
import { WeixinService } from '@src/core/apis/weixin/weixin.service';
import UserEntity from '@src/core/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,

    private readonly weixinServer: WeixinService,
  ) {}

  async authSession(jsCode: string, profile: unknown): Promise<UserEntity> {
    const { data } = await this.weixinServer.authCode2Session(jsCode);
    if (Number(data.errorcode) === 0) {
      const user = await this.userRepository.findOne({
        where: { openid: data.openid },
      });

      if (!user) {
        const wallet = this.walletRepository.create({
          total_fee: 0,
        });
        const user = this.userRepository.create({
          openid: data.openid,
          wallet,
          profile: profile as any,
        });

        return await this.userRepository.save(user);
      } else {
        return user;
      }
    } else {
      throw new HttpException(data.errorcode, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserDetail(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne(userId, { relations: ['wallet'] });
  }

  async updateUserInfo(
    userId: number,
    baseInfo: Partial<UserEntity>,
  ): Promise<null> {
    const updateUser = this.userRepository.create({
      ...baseInfo,
    });
    await this.userRepository.update(userId, {
      ...updateUser,
    });
    return null;
  }
}
