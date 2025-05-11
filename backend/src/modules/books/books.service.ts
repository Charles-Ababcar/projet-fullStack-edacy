import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
} from '@nestjs/common';
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

  async create(createBookDto: CreateBookDto, userId: number) {
    try {
      createBookDto.userId = userId;

      const book = this.booksRepository.create(createBookDto);
      await this.booksRepository.save(book);

      return { message: 'Livre créé avec succès' };
    } catch (error) {
      console.error('Erreur lors de la création du livre :', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de la création du livre',
      );
    }
  }

  async findAll(userId: number) {
    try {
      const listBooks = await this.booksRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      return {
        message: 'Récupération des livres réussie',
        data: listBooks,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des livres :', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de la récupération des livres',
      );
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.booksRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!book) {
        throw new NotFoundException('Livre non trouvé');
      }

      return { data: book };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erreur lors de la récupération du livre :', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de la récupération du livre',
      );
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto, userId: number) {
    try {
      const book = await this.booksRepository.findOne({
        where: { id,userId },
        relations: ['user'],
        
      });

      if (!book) {
        throw new NotFoundException('Livre non trouvé ou accès refusé');
      }

      Object.assign(book, updateBookDto);
      const booksUpdate = await this.booksRepository.save(book);

      return { message: 'Livre modifié avec succès', data: booksUpdate };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erreur lors de la modification du livre :', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de la modification du livre',
      );
    }
  }

  async remove(id: number, userId: number) {
    try {
      const book = await this.booksRepository.findOne({
        where: { id,userId },
        relations: ['user'],
        
      });

      if (!book) {
        throw new NotFoundException('Livre non trouvé ou accès refusé');
      }

      await this.booksRepository.remove(book);

      return { message: 'Livre supprimé avec succès' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erreur lors de la suppression du livre :', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de la suppression du livre',
      );
    }
  }
}

