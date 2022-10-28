import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { error } from 'console';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

//injeção de dependência    
constructor(private readonly authService: AuthService){}
  

  @Post('login')
  async validaLogin(@Body() req) {
    const { login, password } = req;

    if(!login){
        console.log('Login não informado')
        // return{error: true, msg: 'Login não informado'}
        throw new HttpException('Login não informado', 401)      
    }else{
        console.log('Login: ', login);
        console.log('Password: ', password);
        return this.authService.validaLogin(login, password);
    }

    
  }
}
