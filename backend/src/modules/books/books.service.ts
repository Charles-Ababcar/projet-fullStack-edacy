import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/models/books.entity';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, req){
    const userId = req?.user?.userId; 

    createBookDto.userId = userId;

    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }
  

  async findAll(req){
    const userId = req?.user?.userId;
    return this.booksRepository.find({
      where: { user: {id: userId } },
      relations: ['user'], 
    });
  }
  

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['user'] });

    if (!book) {
      throw new NotFoundException('Livre non trouvé');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto, req): Promise<Book> {
    const userId = req.user.userId;
  
    const book = await this.booksRepository.findOne({ where: { id, user: { id: userId } } });
  
    if (!book) {
      throw new NotFoundException('Livre non trouvé ou accès refusé');
    }
  
    Object.assign(book, updateBookDto);
    return this.booksRepository.save(book);
  }
  
  async remove(id: number, req){
    const userId = req.user.userId;
  
    const book = await this.booksRepository.findOne({ where: { id, user: { id: userId } } });
  
    if (!book) {
      throw new NotFoundException('Livre non trouvé ou accès refusé');
    }
  
    await this.booksRepository.remove(book);
  }
  
}
