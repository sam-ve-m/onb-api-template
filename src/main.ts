import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableCors();
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('LIGA Template')
    .setDescription('LIGA Template Description')
    .setVersion('1.0')
    .addTag('LIGA Template')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  const logger = new Logger('bootstrap');

  logger.verbose(`Listening on ${port}`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
