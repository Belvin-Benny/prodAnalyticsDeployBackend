import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './Components/admin/admin.module';
import { ProductsModule } from './Components/products/products.module';
import { CapturesModule } from './Components/captures/captures.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://scani:productanalytics@cluster0.1ghyeiw.mongodb.net/?retryWrites=true&w=majority',
    ),
    AdminModule,
    ProductsModule,
    CapturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
