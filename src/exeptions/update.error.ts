import  {HttpStatus, HttpException} from "@nestjs/common";

export class UpdateError extends HttpException {
  constructor(){
    super('Update error', HttpStatus.BAD_REQUEST)
  }
}