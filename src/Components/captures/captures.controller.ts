import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { CapturesInterface } from '../interface/captures.interface';
import { CreateCaptureDto } from '../dto/captures';
import { CapturesService } from './captures.service';
import { Users } from '../admin/dto/user.dto';
import { MyException } from 'src/Exception';

@Controller('captures')
export class CapturesController {
  constructor(private readonly captureService: CapturesService) { }
  @Get()
  findAll(): Promise<CapturesInterface[]> {
    return this.captureService.findAll();
  }

  @Get('/genuine')
  findGenuine(
    @Query('status', new DefaultValuePipe(1), ParseIntPipe) status = 1,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,) {
    return this.captureService.findGenuine(status, page, limit);
  }
  // @Get('getAllCaptures')
  // async findByPagination(

  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  //   @Query('title') title: string,
  // ): Promise<any> {
  //   console.log(title, page, limit);
  //   return this.captureService.findByPagination(title, page, limit);
  // }

  @Get('getAdminCapture')
  async findAdminUserCapture(
    @Query('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('user') user: string = Users.superAdmin, //required
    @Query('title') title: string,
    @Query('isPagination', new DefaultValuePipe(true), ParseBoolPipe) isPagination: boolean = true,
  ): Promise<any> {
    if (user === Users.admin || user === Users.normalUser) {
      if (id === null || id === undefined) {
        return new MyException('Id is required');
      }
    }
    return await this.captureService.findAdminUserCapture(id, title, page, limit, user, isPagination);
  }

  @Get('getDateRangeCapture')
  async findDateRangeCapture(
    @Query('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('user') user: string = Users.superAdmin, //required
    @Query('title') title: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('isPagination', new DefaultValuePipe(true), ParseBoolPipe) isPagination: boolean = true,
  ): Promise<any> {
    if (user === Users.admin || user === Users.normalUser) {
      if (id === null || id === undefined) {
        return new MyException('Id is required');
      }
    }
    return await this.captureService.findDateRangeCapture(id, title, page, limit, user, start, end, isPagination);
  }

  @Get('filterBySecretCode')
  async sortBySecretCodeCapture(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('title') title: string,
    @Query('isPagination', new DefaultValuePipe(true), ParseBoolPipe) isPagination: boolean = true,
    @Query('accessMethod') accessMethod: string = "Mob",
    @Query('secreteCode') secreteCode: string,

  ): Promise<any> {
    if (secreteCode === null || secreteCode === undefined) {
      return new MyException('SecreteCode is required');
    }
    return await this.captureService.sortBySecretCodeCapture(secreteCode, title, page, limit, isPagination, accessMethod);
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<CapturesInterface> {
    return this.captureService.findOne(id);
  }

  @Get('product/:id')
  findUserProducts(@Param('id') id): Promise<CapturesInterface[]> {
    return this.captureService.findUserProducts(id);
  }

  @Post()
  create(@Body() createProductDto: CreateCaptureDto): Promise<CapturesInterface> {
    return this.captureService.create(createProductDto);
  }

  @Post('multi')
  createMany(@Body() createProductDto: CreateCaptureDto[]): Promise<CapturesInterface[]> {
    return this.captureService.createMany(createProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<CapturesInterface> {
    return this.captureService.delete(id);
  }

  @Put(':id')
  update(@Body() updateProductDto: CreateCaptureDto, @Param('id') id): Promise<CapturesInterface> {
    return this.captureService.update(id, updateProductDto);
  }


}
