import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/product.dto";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("create")
  @HttpCode(201)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ success: string; statusCode: number }> {
    await this.productService.createProduct(createProductDto);

    return {
      success: "Produto criado com sucesso.",
      statusCode: 201,
    };
  }
}
