import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateProductsDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumberString()
    @IsNotEmpty()
    price: number;


    @IsNotEmpty()
    @IsNumberString()
    categoryId: number;
}