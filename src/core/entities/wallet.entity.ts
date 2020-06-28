import { Entity, Column, OneToOne } from 'typeorm';
import User from './user.entity';
import { CommonEntity } from './common.entity';

@Entity('user_wallet')
export default class Wallet extends CommonEntity {
  @Column({ default: 0 })
  total_fee: number;

  @OneToOne(() => User)
  user: User;
}
