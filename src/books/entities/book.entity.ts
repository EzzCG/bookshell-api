import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  title!: string;

  @Index()
  @Column()
  author!: string;

  @Column()
  year!: number;

  @Column({ nullable: true })
  imageUrl?: string;
}
