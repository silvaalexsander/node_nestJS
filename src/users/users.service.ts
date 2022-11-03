import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
        private emailService: EmailService
    ) {}
   

    async getUserById(id: string): Promise<users> {
        const user = await this.prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }   
        return user;
    }

    async verifyUserExists(email: string): Promise<boolean> {
        const user = await this.prisma.users.findUnique({
            where: {
                email
            }
        })
       
        return user ? true : false;
    }

    async crypto(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async createUser(data): Promise<users> {

        const {name, email, password} = data;
        const checkUser = await this.verifyUserExists(email);


        if(!checkUser){
            const user = await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password: await this.crypto(password)
                }
            })

           if(await this.emailService.sendEmail(email, 'Bem vindo' , 'Seja bem vindo ao sistema', {})) {
             console.log('Email enviado com sucesso')
           }
    
            if(!user) {
                throw new Error('Erro ao criar usuário!');
            }
            return user;
        }else{
               throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
            }
            
    }
    

    async findAll() {
        return this.prisma.users.findMany();
    }

    async findOne(id: string) {
        return this.prisma.users.findUnique({
            where: {
                id: Number(id)
            },
        })
    }

    async update(id: string, req) {
        const user = await this.getUserById(id)

        //extraindo novas infos do body
        const {name, email, password} = req;

        //verificando se o email já existe
        if(email){
            const checkEmail = await this.prisma.users.findMany({
                where: {
                    AND: [{email: email}, {id: {not: Number(id)}}]
                },
            })

            if(checkEmail.length > 0) {
                throw new HttpException('Email já está sendo utilizado', HttpStatus.BAD_REQUEST);
            }
        }
        

        const updateUser = await this.prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name  ? name : user.name,
                email: email ? email : user.email,
                password : password ? password : user.password
            }
        })
        if(!updateUser) {
            throw new HttpException('Erro ao atualizar usuário!', HttpStatus.BAD_REQUEST);
        }
        return `Usuário ${updateUser.name} atualizado com sucesso`;
    }

    async remove(id: string) {
        const user = await this.getUserById(id)
        const deleteUser = await this.prisma.users.delete({
            where: {
                id: Number(id)
            }
        })
        if(!deleteUser) {
            throw new HttpException('Erro ao deletar usuário!', HttpStatus.BAD_REQUEST);
        }
        return `Usuário ${user.name} excluído com sucesso`;
    }
}
