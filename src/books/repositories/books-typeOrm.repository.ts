import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Book } from '../domain/book';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksRepository } from '../domain/books.repository';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class TypeOrmBooksRepository implements BooksRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(q?: string): Promise<Book[]> {
    const books = q
      ? await this.bookRepository.find({
          where: [{ title: ILike(`${q}%`) }, { author: ILike(`${q}%`) }],
        })
      : await this.bookRepository.find();

    return books.map((book) => this.toDomain(book));
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id } });
    return book ? this.toDomain(book) : null;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const created = this.bookRepository.create(dto);
    const saved = await this.bookRepository.save(created);
    return this.toDomain(saved);
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book | null> {
    await this.bookRepository.update(id, dto);
    const updated = await this.bookRepository.findOne({ where: { id } });
    return updated ? this.toDomain(updated) : null;
  }

  async remove(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) return null;

    await this.bookRepository.remove(book);
    return this.toDomain(book);
  }

  private toDomain(book: BookEntity): Book {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      imageUrl: book.imageUrl,
    };
  }
}
