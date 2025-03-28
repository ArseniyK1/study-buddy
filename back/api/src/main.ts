import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new ConfigService();
  const port = config.get('PORT') ?? 3000;

  await app.listen(port);
  console.log(`Server started on port ${await app.getUrl()}`);
}
bootstrap();
