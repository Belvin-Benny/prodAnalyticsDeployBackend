import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { ProductInterface } from '../interface/products.interface';
import { CreateProductDto } from '../dto/products';
@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}
  @Get()
  findAll(): Promise<ProductInterface[]> {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<ProductInterface> {
    return this.ProductsService.findOne(id);
  }

  @Get('user/:id')
  findNormalUserProducts(@Param('id') id) {
    return this.ProductsService.findNormalUserProducts(id);
  }
  @Get('admin/:id')
  findUserProducts(@Param('id') id) {
    return this.ProductsService.findUserProducts(id);
  }

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductInterface> {
    return this.ProductsService.create(createProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ProductInterface> {
    return this.ProductsService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: CreateProductDto,
    @Param('id') id,
  ): Promise<ProductInterface> {
    return this.ProductsService.update(id, updateProductDto);
  }
}
