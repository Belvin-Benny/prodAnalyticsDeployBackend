import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsSchema } from './products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../admin/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductsSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
