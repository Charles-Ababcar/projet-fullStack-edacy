import { Controller, Get, Post, UseGuards, Req, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Request ,Response } from 'express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtAuthGuard) 
  @Post('logout')
  @ApiOperation({ summary: 'Déconnexion utilisateur' })
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    console.log("Utilisateur connecté:", req.user);

    return this.authService.logout(req,res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtenir les informations de profil utilisateur' })
  async getProfile(@Req() req) {
    return this.authService.getProfile(req); 
  }

}
