import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { DatabaseService } from './database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DatabaseService,
  ) {}

  @MessagePattern('connect_2')
  async connect_2(config: any) {
    await this.dbService.connect(config);
    return { message: 'Connected to DB!' };
  }

  @MessagePattern('test_conn')
  async test_conn(body: { config: any; sql: string; params?: any[] }) {
    return this.appService.test_conn(body.config, body.sql, body.params);
  }
}
