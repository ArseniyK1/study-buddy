import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    // @Inject('DOP_SERVICE') private client_2: ClientProxy,
  ) {}

  test_connect(config: any) {
    const sql = `
        SELECT a.*, b.value as role_value, b.description as role_description
        FROM auth_user a
        LEFT JOIN role b ON a.role_id = b.id
        WHERE a.id = $1
    `;
    return this.client.send('test_conn', { config, sql, params: [1] });
  }
}
