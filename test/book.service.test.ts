import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from "../src/books/books.service";
import { mockBooks } from "./mock.data";
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { Book } from "../src/books/entity/books.model";

describe('BooksService', () => {
  let booksService: BooksService;

  const mockBookModel = {
    findAll: jest.fn().mockResolvedValue(mockBooks),
    findOne: jest.fn().mockImplementation((id) => {
      const foundBook = mockBooks.find(book => book.id === id);
      return foundBook ? Promise.resolve(foundBook) : Promise.resolve(null);
    }),
    create: jest.fn().mockImplementation((book) => Promise.resolve({ ...book, id: '4' })),
    update: jest.fn().mockImplementation((book) => {
      const updatedBook = { ...book, title: 'Updated Title' };
      return Promise.resolve([1, [updatedBook]]);
    }),
    destroy: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Book]),
      ],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  it('should return all books', async () => {
    const result = await booksService.getAllBooks();
    expect(result).toEqual(mockBooks);
  });

  it('should create a book', async () => {
    const newBook = { title: 'New Book', author: 'New Author', publicationYear: 2024 };
    const createdBook = await booksService.createBook(newBook);
    expect(createdBook).toEqual({ ...newBook, id: '4' });
  });

  it('should update a book', async () => {
    const updateData = { title: 'Updated Title' };
    const updatedBook = await booksService.updateBook(1, updateData);
    expect(updatedBook).toEqual({ ...mockBooks[0], ...updateData });
  });

  it('should delete a book', async () => {
    await booksService.deleteBook(1);
    expect(mockBookModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should get a book by id', async () => {
    const bookId = 1;
    const result = await booksService.getBookById(bookId);
    expect(result).toEqual(mockBooks[0]);
  });

  it('should throw an error if book not found', async () => {
    mockBookModel.findOne.mockResolvedValue(null);
    const bookId = 100; // Non-existent id
    try {
      await booksService.getBookById(bookId);
    } catch (error) {
      expect(error.message).toBe('Book not found');
    }
  });
});
