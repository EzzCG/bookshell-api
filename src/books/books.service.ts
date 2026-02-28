import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, Books } from './models/book';

@Injectable()
export class BooksService {
  private books: Book[] = Books;

  list(q?: string) {
    if (!q) return this.books;
    const s = q.toLowerCase();
    return this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s),
    );
  }

  getOne(id: string) {
    const found = this.books.find((b) => b.id === id);
    if (!found) throw new NotFoundException('Book not found');
    return found;
  }

  create(dto: CreateBookDto) {
    const id = String(Date.now());
    const book: Book = {
      id,
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };
    this.books.push(book);
    return book;
  }

  update(id: string, dto: UpdateBookDto) {
    const idx = this.books.findIndex((b) => b.id === id);
    if (idx === -1) throw new NotFoundException('Book not found');
    this.books[idx] = { ...this.books[idx], ...dto, id };
    return this.books[idx];
  }

  remove(id: string) {
    const idx = this.books.findIndex((b) => b.id === id);
    if (idx === -1) throw new NotFoundException('Book not found');
    const [removed] = this.books.splice(idx, 1);
    return removed;
  }
}
