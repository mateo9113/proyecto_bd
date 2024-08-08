import { Body, Controller, Post } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';



@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosServicio: UsuariosService){}

    //peticiones
    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH  -> ACUALIZAR
    // DELETE  -> ELIMINAR
    @Post()//http://localhost/usuarios
    create(@Body()usuario:CrearUsuarioDto){
        return this.usuariosServicio.create(usuario);
    }
}
