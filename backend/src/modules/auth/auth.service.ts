import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Request, Response } from 'express';
import { User } from 'src/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Aucun utilisateur trouvé avec cet email');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any, res: Response) {
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60, // Expiration du cookie après 60 secondes (1 minute)
      path: '/', // Le cookie est accessible sur tout le site
    });

    return {
      status: 'success',
      message: 'Connexion réussie ✅',
      data: user,
    };
  }

  async logout(req: Request, res: Response): Promise<{ message: string }> {
    console.log('Avant de supprimer le cookie:', req.cookies['access_token']);

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    console.log(
      'Après avoir supprimé le cookie côté serveur:',
      req.cookies['access_token'],
    );

    res.cookie('access_token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Déconnexion réussie ✅' };
  }

  async findUserById(id: number) {
    const user = await this.usersService.findById(id.toString());
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async getProfile(req) {
    const user = await this.usersService.findOne(req.user.userId);

    console.log(
      '==============================USER==========================',
      user,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...userWithoutPassword } = user as User;

    return {
      data: userWithoutPassword,
    };
  }
}
