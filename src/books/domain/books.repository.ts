import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from './book';

export const BOOKS_REPOSITORY = 'BOOKS_REPOSITORY';

export interface BooksRepository {
  findAll(q?: string): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(dto: CreateBookDto): Promise<Book>;
  update(id: string, dto: UpdateBookDto): Promise<Book | null>;
  remove(id: string): Promise<Book | null>;
}
