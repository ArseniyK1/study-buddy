import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  test_connect() {
    return this.client.send('findAllAuthUser', '');
  }
}
