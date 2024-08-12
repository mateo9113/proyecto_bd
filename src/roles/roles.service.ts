import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { CrearRolDto } from './dto/crear-rol.dto';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Rol)private rolesRepositorio:Repository<Rol>){}

    create(rol : CrearRolDto){
        const  nuevoRol=this.rolesRepositorio.create(rol);
        return this.rolesRepositorio.save(nuevoRol);
    }


}
