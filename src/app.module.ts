import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '8766630',
      database: 'proyecto_db',
      entities: [__dirname+ '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuariosModule,
    AuthModule
  ],
})
export class AppModule { }
