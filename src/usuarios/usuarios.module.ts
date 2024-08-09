import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports : [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService,JwtStrategy],
  controllers: [UsuariosController]
})
export class UsuariosModule {}
