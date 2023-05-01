import { Module, forwardRef } from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CapturesController } from './captures.controller';
import { CapturesSchema } from './captures.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Capture', schema: CapturesSchema }]),
    forwardRef(() => ProductsModule),
  ],
  providers: [CapturesService],
  controllers: [CapturesController]
})
export class CapturesModule { }
