import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Book } from 'src/models/books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req) {
    return this.booksService.create(createBookDto, req);
  }
  @UseGuards(JwtAuthGuard) 
  @Get()
  async findAll(req) {
    return this.booksService.findAll(req);
  }
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }
  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto,req) {
    return this.booksService.update(id, updateBookDto,req);
  }
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  async remove(@Param('id') id: number,req) {
    return this.booksService.remove(id,req);
  }
}
