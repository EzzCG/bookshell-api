import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<BookModel>;

@Schema({ timestamps: true })
export class BookModel {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  author!: string;

  @Prop()
  year?: number;
}

export const BookSchema = SchemaFactory.createForClass(BookModel);
