import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('books') 
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  publishDate: Date;  // corrected from 'publishidDate' to 'publishDate'

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })  // Establish the foreign key relationship explicitly
  user: User;

  @Column()
  userId: number; 
}
