import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  desc?: string;
}
