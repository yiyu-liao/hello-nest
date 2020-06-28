import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import Wallet from './wallet.entity';
import { CommonEntity } from './common.entity';
import { UserRole, UserStatus } from '@src/core/interface';

@Entity('user')
export default class User extends CommonEntity {
  @Column()
  openid: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.notValidate,
  })
  status: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.undefined,
  })
  role: number;

  @Column({ default: null })
  phone: number;

  @Column({ default: null })
  realname: string;

  @Column({ type: 'json' })
  profile: string;

  @OneToOne(() => Wallet)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;
}
