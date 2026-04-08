import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseBooksRepository } from './repositories/books-mongoose.repository';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    MongooseBooksRepository,
    {
      provide: 'BOOKS_REPOSITORY',
      useClass: MongooseBooksRepository,
    },
  ],
})
export class BooksModule {}
