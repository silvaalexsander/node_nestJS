import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { users } from '@prisma/client';
import { CreaUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //criar 
    @Post()
    async createUser(@Body() req: CreaUserDTO): Promise<users>{
        return this.usersService.createUser(req);
    }

    //listar todos
    @Get()
    async findAll(){
        return this.usersService.findAll();
    }

    //listar um - users/id
    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }
     
    //atualizar - users/id
    @Patch(':id')
    async update(@Param('id') id: string, @Body() req: UpdateUserDTO){
        return this.usersService.update(id, req);
    }

   

    //deletar
    @Delete(':id')
    async remove(@Param('id') id: string){
        return this.usersService.remove(id);
    }

    //@Body pega o corpo da requisição
    //@Param pega o parametro da url
    //@Req pega todo o request
    //DTO = Data Transfer Object
}
