import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(200)
  author: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  year?: number;
}
