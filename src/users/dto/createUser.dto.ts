import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreaUserDTO {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}