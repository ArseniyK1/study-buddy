import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface AuthService {
  FindAllUsers(request: object): Observable<{ users: any[] }>;
  SignIn({ email, password }): any;
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
    return this.authService.SignIn({ email: 'email', password: 'password' }); // Теперь метод существует!
  }
}
