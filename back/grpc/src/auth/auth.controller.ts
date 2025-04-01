// // grpc-micro/src/auth.controller.ts
// import { Controller } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';
// import { ClientProxy, Client } from '@nestjs/microservices';
// import { Transport } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
// import { UserListResponse } from 'src/generated-types/auth';

// @Controller()
// export class AuthController {
//   @Client({
//     transport: Transport.TCP,
//     options: {
//       host: 'localhost',
//       port: 3001,
//     },
//   })
//   private authClient: ClientProxy;

//   @GrpcMethod('AuthService', 'FindAllAuthUser')
//   async findAllAuthUsers(): Promise<UserListResponse> {
//     // Перенаправляем запрос в auth-micro через TCP
//     const result = await firstValueFrom(
//       this.authClient.send('findAllAuthUser', {}),
//     );
//     return { users: result };
//   }
// }
// //
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthResponse, SignInRequest } from 'src/generated-types/auth';

@Controller()
export class AuthController {
  @GrpcMethod('AuthService', 'SignIn')
  signIn(data: SignInRequest): AuthResponse {
    console.log('gRPC SignIn called with:', data);

    // Ваша логика аутентификации
    return { accessToken: 'jwt_token_here' };
  }
}
