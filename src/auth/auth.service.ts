import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async validaLogin(login: string, password: string) {
        console.log('No Service - Login', login)
        console.log('No Service - Password', password)
        return {login, password, msg: 'Usuário autenticado com sucesso'}
    }

}
