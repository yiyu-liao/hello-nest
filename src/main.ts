import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from '@src/common/interceptors/transform.interceptor';
import { ExceptionsFilter } from '@src/common/filter/error.filter';
import { logger } from '@src/common/middlewares/logger.middleware';
import { join } from 'path';

import config from '@src/config';
import { Logger } from '@src/shared/utils/logger';

import * as helmet from 'helmet';
import * as ratelimit from 'express-rate-limit';

async function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('hello-nest')
    .setDescription('The hello-nest API Documents')
    .setBasePath(config.api_prefix)
    .addBearerAuth()
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  // swagger 地址: http://${config.hostName}:${config.port}/docs
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(config.api_prefix);
  await initSwagger(app);

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.use(helmet());
  app.use(
    ratelimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(logger);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(config.port, config.hostname, () => {
    Logger.log(
      `API server has been started on http://${config.hostname}:${config.port}`,
    );
  });
}
bootstrap();
