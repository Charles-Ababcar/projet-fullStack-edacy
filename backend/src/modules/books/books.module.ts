import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Book } from 'src/models/books.entity';
import { LocalStrategy } from '../auth/local/local.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Book, User]),AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
