import { ReflectionService } from '@grpc/reflection';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../../proto/proto/auth.proto'),
  },
};
//
