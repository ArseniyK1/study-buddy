import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
      ],
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_SERVICE_HOST'),
            port: configService.get<number>('AUTH_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.register([
      {
        name: 'GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '..', '..', 'proto/proto/auth.proto'),
          url: 'localhost:5000', // адрес grpc-micro
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
