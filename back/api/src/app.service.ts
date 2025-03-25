import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private client_1: ClientProxy,
    // @Inject('DOP_SERVICE') private client_2: ClientProxy,
  ) {}

  getHello(config: any) {
    const sql = `
        SELECT a.*
        FROM auth_user a
        WHERE a.id = 1
    `;
    return this.client_1.send('query', { config, sql });
  }

  connect(config: any) {
    return this.client_1.send('connect_2', config);
  }

  // getHello_2(): Observable<string> {
  //   return this.client_2.send({ role: 'item', cmd: 'create' }, '222222');
  // }
}
