import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Book } from './books.entity';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;


  @ApiProperty()
  @Column({ nullable: true })
  mobileNumber: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;
   
  @ApiProperty()
  @Column({ nullable : true})
  displayName:string

  @ApiProperty()
  @Column({ nullable: true })
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  country: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
   
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

 @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;
  

  @OneToMany(() => Book, (book) => book.user)  // Relation OneToMany avec Book
  books: Book[];
}
