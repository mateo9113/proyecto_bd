import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto{

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    correo: string;

    @IsNotEmpty()
    @IsString()
    contrasenia: string;
}