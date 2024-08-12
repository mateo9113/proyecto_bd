import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from 'src/auth/dto/actualizar-usuario.dto';
import storage = require('../utilidadades/cloud_storage');
import { Rol } from 'src/roles/rol.entity';

// Simula el contexto de usuario actual
const currentUserId = 1; // Este valor debe ser obtenido de la autenticación

@Injectable()
export class UsuariosService {


    constructor(
        @InjectRepository(Usuario) private usuariosRepositorio: Repository<Usuario>,
    ) { }

    create(usuario: CrearUsuarioDto) {
        const nuevoUsuario = this.usuariosRepositorio.create({
            ...usuario,
            usuario_id: currentUserId, // Asigna el usuario_id aquí
        });
        return this.usuariosRepositorio.save(nuevoUsuario);
    }

    findAll() {
        return this.usuariosRepositorio.find({relations:['roles']})
    }

    async actualizar(id: number, usuario: ActualizarUsuarioDto) {
        const usuarioEncontrado = await this.usuariosRepositorio.findOneBy({ id: id });
        if (!usuarioEncontrado) {
            return new HttpException('Usuario No Encontrado', HttpStatus.NOT_FOUND);
        }

        const usuarioActualizado = Object.assign(usuarioEncontrado, usuario);
        return this.usuariosRepositorio.save(usuarioActualizado);
    }

    
    async actualizarImagen(file: Express.Multer.File, id: number, usuario: ActualizarUsuarioDto) {
        const url = await storage(file, file.originalname);
        console.log('URL:  ' + url);

        if (url === undefined && url === null) {
            // error 500 servido
            return new HttpException(' la imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);

        }

        const usuarioEncontrado = await this.usuariosRepositorio.findOneBy({ id: id });
        if (!usuarioEncontrado) {
            return new HttpException('Usuario No Encontrado', HttpStatus.NOT_FOUND);
        }
        usuario.imagen = url;
        const usuarioActualizado = Object.assign(usuarioEncontrado, usuario);
        return this.usuariosRepositorio.save(usuarioActualizado);

    }

}
