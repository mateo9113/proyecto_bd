import { IsNotEmpty, IsString } from "class-validator";

export class CrearRolDto{

    @IsNotEmpty()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    ruta:string;
    

}