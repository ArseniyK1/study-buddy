import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService implements TypeOrmOptionsFactory {
  constructor(private readonly dbService: DatabaseService) {}
  private dataSource: DataSource;

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // не используйте в продакшене!
    };
  }

  async connect(config) {
    // this.dataSource = new DataSource(config);
    // await this.dataSource.initialize();
    // console.log('Database connected!');
    await this.dbService.connect(config);
    return { message: 'Connected to database!' };
  }

  async query(config: any, sql: string, params?: any[]) {
    await this.dbService.connect(config);
    const res = await this.dbService.query(sql, params);
    await this.dbService.disconnect();
    return res;
  }

  // async query_2(sql: string, params?: any[]) {
  //   return this.dbService.rawQuery(sql, params);
  // }

  async disconnect() {
    await this.dataSource.destroy();
  }
}
