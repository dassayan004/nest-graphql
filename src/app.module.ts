import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,

      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        // sortSchema: true,
        playground: true,
        // introspection: true,
        // cors: {
        //   origin: '*', // or your frontend URL
        //   credentials: true,
        // },
      }),
    }),
    DatabaseModule,
    ProductModule,
  ],
})
export class AppModule {}
