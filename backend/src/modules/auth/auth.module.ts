import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/tables';

@Module({
  imports :[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({  defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    UsersModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy,UsersService,AuthService,],
  exports: [JwtModule,UsersService],
})
export class AuthModule {}
