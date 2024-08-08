import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

// Simula el contexto de usuario actual
const currentUserId = 1; // Este valor debe ser obtenido de la autenticación

@Injectable()
export class UsuariosService {


    constructor(@InjectRepository(Usuario) private usuariosRepositorio: Repository<Usuario>) { }

    create(usuario: CrearUsuarioDto) {
        const nuevoUsuario = this.usuariosRepositorio.create({
            ...usuario,
            usuario_id: currentUserId, // Asigna el usuario_id aquí
        });
        return this.usuariosRepositorio.save(nuevoUsuario);
    }

}
