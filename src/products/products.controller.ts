import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { CreateProductsDTO } from './dto/createProducts.dto';
import { UpdateProductsDTO } from './dto/updateProducts.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async createProduct(@Body() req: CreateProductsDTO): Promise<string> {
        return this.productsService.createProduct(req);
    }

    @Get()
    async findAll(){
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param(':id') id: string){
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param(':id') id:string, @Body() req: UpdateProductsDTO){
        return this.productsService.update(id, req);
    }
}
