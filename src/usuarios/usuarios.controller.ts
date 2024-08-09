import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosServicio: UsuariosService) { }

    //peticiones
    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH  -> ACUALIZAR
    // DELETE  -> ELIMINAR

    @UseGuards(jwtAuthGuard)//proteger las rutas 
    @Get() //http://localhost/usuarios
    findAll() {
        return this.usuariosServicio.findAll();
    }

    @Post()//http://localhost/usuarios
    create(@Body() usuario: CrearUsuarioDto) {
        return this.usuariosServicio.create(usuario);
    }

}
