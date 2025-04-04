import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @Length(3, 255)
  name: string;

  @Field()
  @IsString()
  desc: string;
}
