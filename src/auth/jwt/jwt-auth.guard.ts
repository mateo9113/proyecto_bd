import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// para proteger las rutas 
@Injectable()
    export class jwtAuthGuard extends AuthGuard('jwt'){}
