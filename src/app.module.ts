import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    // MongooseModule.forRoot(
    //   process.env.MONGO_URI || 'mongodb://mongo:27017/bookshell',
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
