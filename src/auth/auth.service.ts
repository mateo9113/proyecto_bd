import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { Repository } from 'typeorm';
import { RegistroAuthDto, } from './dto/registro-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const currentUserId = 1;
@Injectable()
export class AuthService {

    constructor(@InjectRepository(Usuario) private usuariosRepositorio: Repository<Usuario>,
        private jwtService: JwtService
    ) { }

    async register(usuario: RegistroAuthDto) {

        const CorreoExistente = await this.usuariosRepositorio.findOneBy({ correo: usuario.correo })

        if (CorreoExistente) {
            // 409 conflict 
            return new HttpException("El correo ya esta Registrado", HttpStatus.CONFLICT);
        }

        const telefonoExistente = await this.usuariosRepositorio.findOneBy({ telefono: usuario.telefono });

        if (telefonoExistente) {
            // 409 conflict 
            return new HttpException("El numero ya esta Registrado", HttpStatus.CONFLICT);
        }

        const nuevoUsuario = this.usuariosRepositorio.create({
            ...usuario,
            usuario_id: currentUserId, // Asigna el usuario_id aquí
        });
        return this.usuariosRepositorio.save(nuevoUsuario);
    }

    async login(loginData: LoginAuthDto) {

        const { correo, contrasenia } = loginData;
        const usuarioEncontrado = await this.usuariosRepositorio.findOneBy({ correo: correo })
        if (!usuarioEncontrado) {
            // error 404
            return new HttpException("El Correo no esta Registrado", HttpStatus.NOT_FOUND);
        }
        const ContraseniaValida = await compare(contrasenia, usuarioEncontrado.contrasenia)
        if (!ContraseniaValida) {
            // error 403 
            return new HttpException("La contraseña es Incorrecta", HttpStatus.FORBIDDEN);
        }

        const payload = {id: usuarioEncontrado, nombre: usuarioEncontrado.nombre};
        const token= this.jwtService.sign(payload);
        const data={
            usuario : usuarioEncontrado,
            token : token
        }

        return data;

    }

}
