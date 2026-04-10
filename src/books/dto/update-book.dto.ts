import { CreateBookDto } from './create-book.dto';
import { PartialType, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {}
