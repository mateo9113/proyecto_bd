// dto= data transfer object (SIRVE PARA LA INFORMACION QUE MANDAMOS A LA APP)
export class CrearUsuarioDto {

    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    imagen?: string;
    contrasenia: string;
    notificacion_token?: string;
    estado: number;
    // usuario_id?: number;

}