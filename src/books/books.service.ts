import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BOOKS_REPOSITORY } from './domain/books.repository';
import type { BooksRepository } from './domain/books.repository';
@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: BooksRepository,
  ) {}

  async findAll(q?: string) {
    return this.booksRepository.findAll(q);
  }

  async findById(id: string) {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async create(dto: CreateBookDto) {
    return this.booksRepository.create(dto);
  }

  async update(id: string, dto: UpdateBookDto) {
    const book = await this.booksRepository.update(id, dto);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string) {
    const book = await this.booksRepository.remove(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}
