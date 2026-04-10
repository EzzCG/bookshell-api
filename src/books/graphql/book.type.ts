import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  author!: string;

  @Field(() => Int)
  year!: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
