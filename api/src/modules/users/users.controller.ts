import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor( private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getUser();
  }
}