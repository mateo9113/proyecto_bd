import { IsNotEmpty, IsString } from "class-validator";

export class ActualizarUsuarioDto {
    nombre?: String;
    apellido?: String;
    telefono?: String;    
    imagen?: String;
    notificacion_token?:String;

}