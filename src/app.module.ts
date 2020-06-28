import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { FeaturesModule } from '@src/core/features.module';

@Module({
  imports: [FeaturesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
