import { IsString,IsNotEmpty,IsEmail, MinLength } from "class-validator";

export class RegistroAuthDto{
    // vaildaciones

    @IsNotEmpty()
    @IsString()
    nombre : string;
    
    @IsNotEmpty()
    @IsString()
    apellido : string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    correo : string;

    @IsNotEmpty()
    @IsString()
    telefono : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message: 'La contraseña Debe tener minimo 6 caracteres'})
    contrasenia : string;
    
}