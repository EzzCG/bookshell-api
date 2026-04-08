import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseBooksRepository } from './repositories/books-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModel, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookModel.name, schema: BookSchema }]),
  ],
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
