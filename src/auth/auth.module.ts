import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports:[JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6h' }
  }),
  TypeOrmModule.forFeature([Usuario])], //lamar si o si 
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
