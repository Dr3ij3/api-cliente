import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateCustomerdto {
    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    telephone: string;
}

export class UpdateCustomerDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}

