import { SetMetadata } from "@nestjs/common";
import { JwtRole } from "./jwt-role";

//para porteger  las rutas

export  const HasRoles =(...roles:JwtRole[])=>SetMetadata('roles',roles);
