import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';
@InputType()
export class CreateBookDto {
  @Field()
  @IsString()
  @MaxLength(200)
  title!: string;

  @Field()
  @IsString()
  @MaxLength(200)
  author!: string;

  @Field()
  @IsOptional()
  @IsInt()
  @Min(0)
  year?: number;
}
