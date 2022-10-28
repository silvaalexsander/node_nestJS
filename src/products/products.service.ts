import { Injectable } from '@nestjs/common';
import { CreateProductsDTO } from './dto/createProducts.dto';
import { UpdateProductsDTO } from './dto/updateProducts.dto';

@Injectable()
export class ProductsService {
    async createProduct(req): Promise<string>{
        return 'Create Product';
    }

    async findAll(){
        return 'Find All';
    }

    async findOne(id: string){
        return `Find One ${id}`;
    }

    async update(id: string, req: UpdateProductsDTO){
        return `Update ${id}`;
    }
}
