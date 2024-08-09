import { hash } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({ name: 'usuario' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: String;
    @Column()
    apellido: String;
    @Column({ unique: true })
    correo: String;
    @Column({ unique: true })
    telefono: String;
    @Column({ nullable: true })
    imagen: String;
    @Column()
    contrasenia: String;
    @Column({ nullable: true })
    notificacion_token: String;
    @Column({ default: 'default' })
    rol: string;
    @Column({ default: 1 })
    estado: number;

    // atri.auditoria
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    crear_en: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    modificado_en: Date;
    @Column({ type: 'int', nullable: false })
    usuario_id: number;

    @BeforeInsert()
    async hasConstrasenia() {
        this.contrasenia = await hash(this.contrasenia, Number(process.env.HASH_SALT));
    }

}