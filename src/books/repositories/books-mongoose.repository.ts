import { Injectable } from '@nestjs/common';
import { Book, Books } from '../domain/book';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksRepository } from '../domain/books.repository';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookModel } from '../schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongooseBooksRepository implements BooksRepository {
  constructor(
    @InjectModel(BookModel.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}
  private books = Books;

  async findAll(q?: string): Promise<Book[]> {
    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { author: { $regex: q, $options: 'i' } },
          ],
        }
      : {};

    const docs = await this.bookModel.find(filter).exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id: string): Promise<Book | null> {
    const doc = await this.bookModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const created = await this.bookModel.create(dto);
    return this.toDomain(created);
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book | null> {
    const doc = await this.bookModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    return doc ? this.toDomain(doc) : null;
  }

  async remove(id: string): Promise<Book | null> {
    const doc = await this.bookModel.findByIdAndDelete(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  private toDomain(doc: BookDocument): Book {
    return {
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      year: doc.year,
      imageUrl: doc.imageUrl,
    };
  }
}
