import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  // await app.startAllMicroservices();

  const config = new ConfigService();
  const port = config.get('PORT') ?? 3000;

  await app.listen(port);
  console.log(`Server started on port ${await app.getUrl()}`);
}
bootstrap();
