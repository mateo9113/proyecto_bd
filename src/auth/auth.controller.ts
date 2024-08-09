import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroAuthDto } from './dto/registro-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) { }

    @Post("registro")//http://localhost/auth/registro ->POST
    register(@Body() usuario: RegistroAuthDto) {
        return this.AuthService.register(usuario);
    }
    
    @Post("login")//http://localhost/auth/login ->POST
    login(@Body() loginData: LoginAuthDto) {
        return this.AuthService.login(loginData);
    }

}
