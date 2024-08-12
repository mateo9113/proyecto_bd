import { Usuario } from "src/usuarios/usuario.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'rol' })
export class Rol {
    @PrimaryColumn()
    id: string;

    @Column({unique:true})
    nombre: string;

    @Column()
    imagen: string;
    
    @Column()
    ruta: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    crear_en: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    modificado_en: Date;


// relacion
    @ManyToMany(()=>Usuario,(usuario)=>usuario.roles)
    usuarios: Usuario[]


}

