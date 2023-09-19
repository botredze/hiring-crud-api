
import {IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator'
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  publicationYear: number;
}

export class UpdateBookDto {
  title?: string;
  author?: string;
  publicationYear?: number;
}

export interface GenericIdParam {

  id: number;
}

export interface GenericResponse<T> {
  data: T;
}
