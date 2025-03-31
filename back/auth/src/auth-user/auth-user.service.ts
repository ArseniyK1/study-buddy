import { Injectable } from '@nestjs/common';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { PrismaService } from '../prisma.service';
import { AuthUser } from './entities/auth-user.entity';
import { getUserById } from '@prisma/client/sql';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';

@Injectable()
export class AuthUserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<AuthUser[]> {
    // return this.prisma.$queryRawTyped(getUserById(50));
    return await this.prisma.auth_user.findMany();
  }

  async signUp(dto: CreateAuthUserDto) {
    // return await this.prisma.auth_user.create();
  }

  update(id: number, updateAuthUserDto: UpdateAuthUserDto) {
    return `This action updates a #${id} authUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} authUser`;
  }
}
