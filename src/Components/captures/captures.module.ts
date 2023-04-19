import { Module } from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CapturesController } from './captures.controller';
import { CapturesSchema } from './captures.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Capture', schema: CapturesSchema }])],
  providers: [CapturesService],
  controllers: [CapturesController]
})
export class CapturesModule {}
