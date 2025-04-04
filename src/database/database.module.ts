import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  loggingMiddleware,
  PrismaModule,
  PrismaService,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

@Global()
@Module({
  imports: [
    PrismaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        prismaOptions: {
          datasourceUrl: configService.getOrThrow('DATABASE_URL'),
        },
        middlewares: [
          loggingMiddleware({
            logLevel: 'debug', // only in development
            logger: new Logger(PrismaService.name),
            logMessage: (query) =>
              `[Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      }),
    }),
  ],
  providers: [
    PrismaService, // Ensure PrismaService is provided
    providePrismaClientExceptionFilter(), // Corrected usage
  ],
  exports: [PrismaService], // Export PrismaService for other modules
})
export class DatabaseModule {}
