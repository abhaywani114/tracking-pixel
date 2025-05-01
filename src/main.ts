import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Email Tracking Pixel API')
    .setDescription('API for tracking email opens via a 1x1 pixel, including open time, IP-based location, user agent, and forwarded detection using hash-based tracking.')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
