import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class ProductFilterInput {
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
