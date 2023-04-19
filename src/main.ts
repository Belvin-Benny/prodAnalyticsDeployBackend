import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3001
  await app.listen(port,()=>{
    console.log('Listening on port ',port);
  });
   console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
