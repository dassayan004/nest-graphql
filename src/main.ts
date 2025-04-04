import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // PORT configaration
  const port = configService.getOrThrow<number>('PORT');
  const baseUrl = configService.getOrThrow<string>('BASE_URL');
  // app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties that are not defined in DTO
      forbidNonWhitelisted: true, // Throws an error if unknown properties are found
      transform: true, // Automatically transforms input data to match DTO types
    }),
  );
  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins (not recommended for production)
    credentials: true, // Allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  });
  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${baseUrl}`);
  Logger.log(`🌎 Apollo is running on: ${baseUrl}/graphql`);
}
bootstrap();
