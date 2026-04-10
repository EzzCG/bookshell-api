import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseBooksRepository } from './repositories/books-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModel, BookSchema } from './schemas/book.schema';
import { TypeOrmBooksRepository } from './repositories/books-typeOrm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BooksResolver } from './book.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookModel.name, schema: BookSchema }]),
    TypeOrmModule.forFeature([BookEntity]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksResolver,
    MongooseBooksRepository,
    TypeOrmBooksRepository,
    // {
    //   provide: 'BOOKS_REPOSITORY',
    //   useClass: MongooseBooksRepository,
    // },
    {
      provide: 'BOOKS_REPOSITORY',
      useClass: TypeOrmBooksRepository,
    },
  ],
})
export class BooksModule {}
