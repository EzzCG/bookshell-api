import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Defaulls
  app.enableCors(); // Allow frontend to call the API during development
  app.setGlobalPrefix('api'); // All routtes will start with /api (nice and clean)

  // Auto-validate incoming JSON according to our DTO classes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove any extras that don't match the pipe
      forbidNonWhitelisted: true, //send an error of extras instead of remaining silent
      transform: true, // transform properties to match dto, '1' -> 1 = string -> int
    }),
  );
  await app.listen(3000);
  console.log(`API running on http://localhost:3000/api`);
}
bootstrap();
