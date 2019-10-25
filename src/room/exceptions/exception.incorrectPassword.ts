import { ConflictException } from '@nestjs/common';
import {
  REQUEST_PASSWORD_INCORRECT_MESSAGE,
  STATUS_CODE_UNAUTHORIZED,
} from '../room.constant';

export class IncorrectPasswordException extends ConflictException {
  constructor() {
    super({
      message: REQUEST_PASSWORD_INCORRECT_MESSAGE,
      statusCode: 409,
    });
  }
}
