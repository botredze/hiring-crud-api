import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "./entity/books.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBookDto, UpdateBookDto } from "./dto/dto";
import { UpdateError } from "../exeptions/update.error";
import { DataEmptyExeption } from "../exeptions/data.empty.exeption";

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book) {
  }

  async getAllBooks(): Promise<Book[]>{
    return this.bookModel.findAll();
  }

  async createBook(dto: CreateBookDto): Promise<Book>{
    if(dto) {
      const book = await this.bookModel.create(dto)
      if (!book) {
        throw new HttpException('Book created error', HttpStatus.BAD_REQUEST)
      }

      return book
    }
    throw new DataEmptyExeption()
  }

  async updateBook(id: number, dto: UpdateBookDto): Promise<[number]>{
    if(id && dto) {
      const book = await this.bookModel.update(dto, { where: { id } })
      if (!book) {
        throw  new UpdateError()
      }
      return book;
    }

    throw new DataEmptyExeption()
  }

  async deleteBook(id: number): Promise<void> {
    if(id) {
      await this.bookModel.destroy({ where: { id } })
    }
    throw new HttpException('Parameter id is empty', HttpStatus.BAD_REQUEST)
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookModel.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
