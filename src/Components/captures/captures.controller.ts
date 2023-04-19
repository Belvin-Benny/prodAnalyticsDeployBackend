import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
import { CapturesInterface } from '../interface/captures.interface';
import { CreateCaptureDto } from '../dto/captures';
import { CapturesService } from './captures.service';

@Controller('captures')
export class CapturesController { constructor(private readonly ProductsService: CapturesService) {}
@Get()
findAll(): Promise<CapturesInterface[]> {
  return this.ProductsService.findAll();
}

@Get(':id')
findOne(@Param('id') id): Promise<CapturesInterface> {
  return this.ProductsService.findOne(id);
}

@Get('product/:id')
findUserProducts(@Param('id') id): Promise<CapturesInterface[]> {
  return this.ProductsService.findUserProducts(id);
}

@Post()
create(@Body() createProductDto: CreateCaptureDto): Promise<CapturesInterface> {
  return this.ProductsService.create(createProductDto);
}

@Post('multi')
createMany(@Body() createProductDto: CreateCaptureDto[]): Promise<CapturesInterface[]> {
  return this.ProductsService.createMany(createProductDto);
}

@Delete(':id')
delete(@Param('id') id): Promise<CapturesInterface> {
  return this.ProductsService.delete(id);
}

@Put(':id')
update(@Body() updateProductDto: CreateCaptureDto, @Param('id') id): Promise<CapturesInterface> {
  return this.ProductsService.update(id, updateProductDto);
}
}
