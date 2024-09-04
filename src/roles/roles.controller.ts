import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CrearRolDto } from './dto/crear-rol.dto';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { jwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';

@Controller('roles')
export class RolesController {

    constructor(private rolesServicio: RolesService){}

    @HasRoles(JwtRole.ADMIN) // proteger para q entren solo admin
    @UseGuards(jwtAuthGuard,JwtRolesGuard)
    @Post()
    create(@Body()rol:CrearRolDto){
        return this.rolesServicio.create(rol);
    }

}
