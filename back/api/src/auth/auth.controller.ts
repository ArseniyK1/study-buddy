import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sing-in.dto';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../grpc/src/generated-types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  signIn(@Body() dto: SignInDto): Observable<AuthResponse> {
    return this.authService.signIn(dto);
  }
}
