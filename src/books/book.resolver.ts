import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './graphql/book.type';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book])
  books(@Args('q', { nullable: true }) q?: string) {
    return this.booksService.findAll(q);
  }

  @Query(() => Book)
  book(@Args('id') id: string) {
    return this.booksService.findById(id);
  }

  @Mutation(() => Book)
  createBook(@Args('input') dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Mutation(() => Book)
  updateBook(@Args('id') id: string, @Args('input') dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Mutation(() => Book)
  removeBook(@Args('id') id: string) {
    return this.booksService.remove(id);
  }
}
