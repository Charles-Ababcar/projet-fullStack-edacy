import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async findByEmail(email: string): Promise<User | any> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà.');
    }
  
    const { firstName, lastName, password } = createUserDto;
    const displayName = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      displayName,
    });
  
    const savedUser = await this.usersRepository.save(user);
  
    // Supprimer le mot de passe de l'objet retourné
    const { password: _, ...userWithoutPassword } = savedUser  as any;
  
    return {
      message: 'Utilisateur créé avec succès!',
      data: userWithoutPassword,
    };
  }
  


  
 

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['books'], // si tu veux aussi charger les livres associés à l'utilisateur
    });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    return user;
  }
  
  async findAll() {
    return this.usersRepository.find();
  }
  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({where : {id}});
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    // Mettre à jour les propriétés de l'utilisateur
    const updatedUser = Object.assign(user, updateUserDto);
  
    if (updateUserDto.password) {
      // Si le mot de passe est mis à jour, on le hache avant de l'enregistrer
      updatedUser.password = await bcrypt.hash(updateUserDto.password, 10);
    }
  
    await this.usersRepository.save(updatedUser);
  
    return {
      message: 'Utilisateur mis à jour avec succès!',
      data: updatedUser,
    };
  }

  
  async findById(id: string): Promise<User | any> { 
    return this.usersRepository.findOne({ 
      where: { id: id } 
    });
  }
  

  async remove(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({where : {id}});
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    await this.usersRepository.remove(user);
  
    return {
      message: 'Utilisateur supprimé avec succès!',
    };
  }
  
}
