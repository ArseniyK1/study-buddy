// import { AuthServiceClient } from '../../grpc/src/generated-types/auth';
import { Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Metadata } from '@grpc/grpc-js';

interface AuthService {
  FindAllUsers(request: object): Observable<{ users: any[] }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('GRPC_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
    console.log('Service methods:', Object.keys(this.authService));
  }

  @Get('/users')
  getUsers() {
    const metadata = new Metadata();
    metadata.add('Set-Cookie', 'yummy_cookie=choco');

    return this.authService.FindAllUsers({}); // Теперь метод существует!
  }
}
