import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { jwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ActualizarUsuarioDto } from 'src/auth/dto/actualizar-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';



@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosServicio: UsuariosService) { }

    //peticiones
    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH  -> ACUALIZAR
    // DELETE  -> ELIMINAR

    @HasRoles(JwtRole.ADMINISTRADOR,JwtRole.VENDEDOR) // proteger para q entren solo admin
    @UseGuards(jwtAuthGuard,JwtRolesGuard)//proteger las rutas 
    @Get() //http://localhost/usuarios
    findAll() {
        return this.usuariosServicio.findAll();
    }

    @Post()//http://192.168.1.7:3000/usuarios
    create(@Body() usuario: CrearUsuarioDto) {
        return this.usuariosServicio.create(usuario);

    }

    @HasRoles(JwtRole.ADMINISTRADOR,JwtRole.VENDEDOR) // proteger para q entren solo admin
    @UseGuards(jwtAuthGuard,JwtRolesGuard) //usuario autenficado nomas pueda hacer eso 
    @Put(':id')//http://192.168.1.7:3000/usuarios
    actualizar(@Param('id', ParseIntPipe) id: number, @Body() usuario: ActualizarUsuarioDto) {
        return this.usuariosServicio.actualizar(id, usuario);
    }


    @HasRoles(JwtRole.ADMINISTRADOR,JwtRole.VENDEDOR) // proteger para q entren solo admin
    @UseGuards(jwtAuthGuard,jwtAuthGuard)
    @Post('acualizarImagen/:id')
    @UseInterceptors(FileInterceptor('file'))
    acualizarImagen(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() usuario: ActualizarUsuarioDto
    ) {
        return this.usuariosServicio.actualizarImagen(file, id, usuario);
    }

}
