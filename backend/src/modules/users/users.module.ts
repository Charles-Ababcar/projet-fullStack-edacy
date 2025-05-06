import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/models/books.entity';
import { User } from 'src/models/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Book, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
