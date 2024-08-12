import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CrearRolDto } from './dto/crear-rol.dto';

@Controller('roles')
export class RolesController {

    constructor(private rolesServicio: RolesService){}

    @Post()
    create(@Body()rol:CrearRolDto){
        return this.rolesServicio.create(rol);
    }

}
