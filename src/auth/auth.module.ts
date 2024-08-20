import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesService } from 'src/roles/roles.service';
import { Rol } from 'src/roles/rol.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario,Rol]),
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6h' }
  }),
  TypeOrmModule.forFeature([Usuario])], //lamar si o si 
  providers: [AuthService, RolesService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
