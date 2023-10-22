import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './game/gateway.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useWebSocketAdapter(new WebsocketAdapter(app));

  app.enableCors({
    origin: '*',
  });

  await app.listen(4000);
}
bootstrap();