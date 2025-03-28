import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  ErrorResponse,
  SignInRequest,
} from '../proto/generated/auth';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'SignIn')
  signIn(data: SignInRequest): AuthResponse | ErrorResponse {
    console.log(data);
    return { accessToken: 'ACCESS_TOKEN' };
  }
}
