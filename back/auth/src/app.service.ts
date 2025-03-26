import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}
  private dataSource: DataSource;

  async test_conn(config: any, sql: string, params?: any[]) {
    await this.dbService.connect(config);
    const res = await this.dbService.query(sql, params);
    await this.dbService.disconnect();
    return res;
  }

  async disconnect() {
    await this.dataSource.destroy();
  }
}
