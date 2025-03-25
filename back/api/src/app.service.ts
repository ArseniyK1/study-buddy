import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private client_1: ClientProxy,
    // @Inject('DOP_SERVICE') private client_2: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    const a = new PrismaClient();
    return this.client_1.send({ role: 'item', cmd: 'create' }, '11111');
  }

  // getHello_2(): Observable<string> {
  //   return this.client_2.send({ role: 'item', cmd: 'create' }, '222222');
  // }
}
