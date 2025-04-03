import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

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
    // ClientsModule.registerAsync([
    //   {
    //     name: 'AUTH_SERVICE',
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.TCP,
    //       options: {
    //         host: configService.get<string>('AUTH_SERVICE_HOST'),
    //         port: configService.get<number>('AUTH_SERVICE_PORT'),
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
    AuthModule,
  ],
})
export class AppModule {}
