import { Injectable } from '@nestjs/common';
import { Book, Books } from '../domain/book';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksRepository } from '../domain/books.repository';

@Injectable()
export class MongooseBooksRepository implements BooksRepository {
  private books = Books;

  async findAll(q?: string): Promise<Book[]> {
    if (!q) return this.books;

    const s = q.toLowerCase();
    return this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s),
    );
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.find((b) => b.id === id) ?? null;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const book: Book = {
      id: crypto.randomUUID(),
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };

    this.books.push(book);
    return book;
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book | null> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    this.books[index] = { ...this.books[index], ...dto, id };
    return this.books[index];
  }

  async remove(id: string): Promise<Book | null> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const [removed] = this.books.splice(index, 1);
    return removed;
  }
}
