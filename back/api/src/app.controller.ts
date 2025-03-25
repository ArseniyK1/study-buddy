import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() config: any) {
    return this.appService.getHello(config);
  }

  @Post('2')
  connect(@Body() body: any) {
    console.log(body);
    return this.appService.connect(body);
  }
}
