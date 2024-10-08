import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActualizarUsuarioDto } from 'src/auth/dto/actualizar-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';



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

    @Post()//http://192.168.1.7:3000/usuarios
    create(@Body() usuario: CrearUsuarioDto) {
        return this.usuariosServicio.create(usuario);

    }
    @UseGuards(jwtAuthGuard) //usuario autenficado nomas pueda hacer eso 
    @Put(':id')//http://192.168.1.7:3000/usuarios
    actualizar(@Param('id', ParseIntPipe) id: number, @Body() usuario: ActualizarUsuarioDto) {
        return this.usuariosServicio.actualizar(id, usuario);
    }
    @UseGuards(jwtAuthGuard)
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
