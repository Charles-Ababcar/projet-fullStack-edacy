import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDate()
  publishDate: Date;

  @ApiProperty()
  @IsInt()
  userId: number; 
}
