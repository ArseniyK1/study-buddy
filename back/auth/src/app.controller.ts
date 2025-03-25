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

  @MessagePattern('connect')
  async connect(config: any) {
    await this.appService.connect(config);
    return { message: 'Connected!' };
  }

  @MessagePattern('connect_2')
  async connect_2(config: any) {
    await this.dbService.connect(config);
    return { message: 'Connected to DB!' };
  }

  @MessagePattern('query')
  async query(body: { config: any; sql: string; params?: any[] }) {
    console.log('ASDADASDASDASD');
    return this.appService.query(body.config, body.sql, body.params);
  }
}
