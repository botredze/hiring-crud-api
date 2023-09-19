import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./books/entity/books.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DatabaseModule, BooksModule]
})
export class AppModule {}
