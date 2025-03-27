import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test_connection')
  test_connect() {
    return this.appService.test_connect();
  }
}
