import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from "./entity/books.model";
import { CreateBookDto, GenericIdParam, UpdateBookDto, GenericResponse } from "./dto/dto";

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all books.', type: Book, isArray: true })
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new book.', type: Book })
  @ApiBody({ type: CreateBookDto })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Updates a book.' })
  @ApiBody({ type: UpdateBookDto })
  async updateBook(@Param() params: GenericIdParam, @Body() updateBookDto: UpdateBookDto): Promise<GenericResponse<Book>> {
    const [updatedRows] = await this.booksService.updateBook(params.id, updateBookDto);

    if (updatedRows > 0) {
      const updatedBook = await this.booksService.getBookById(params.id);
      return { data: updatedBook };
    } else {
      return { data: null };
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Deletes a book.' })
  async deleteBook(@Param() params: GenericIdParam): Promise<void> {
    return this.booksService.deleteBook(params.id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Returns a book by ID.', type: Book })
  async getBookById(@Param() params: GenericIdParam): Promise<Book> {
    return this.booksService.getBookById(params.id);
  }
}
