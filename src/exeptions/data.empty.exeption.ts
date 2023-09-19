import  {HttpStatus, HttpException} from "@nestjs/common";

export class DataEmptyExeption extends HttpException {
  constructor(){
    super('Data empty', HttpStatus.BAD_REQUEST)
  }
}