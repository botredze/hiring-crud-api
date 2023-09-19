import { Module } from '@nestjs/common';
import {SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { Book } from "../books/entity/books.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [],
    }),
  ]})
export class DatabaseModule {}
