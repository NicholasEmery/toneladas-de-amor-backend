import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto { 
    @ApiProperty({
        default: "Feijão",
        description: "Nome do Produto",
    })
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @ApiProperty({
        default: 0,
        description: "Quantidade do Produto no Estoque",
    })
    @IsNumber()
    @IsNotEmpty()
    stockQuant!: number;
    
    @ApiProperty({
        default: "Comida",
        description: "Categoria do Produto",
    })
    @IsString()
    @IsNotEmpty()
    category!: string;
}