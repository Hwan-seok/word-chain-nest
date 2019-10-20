import { ConflictException } from '@nestjs/common';
import {
  HTTP_RESPONSE_CONFLICT_CODE,
  REQUEST_ID_NOT_EXISTS_MESSAGE,
} from '../user.constants';

export class DeleteUserNotExistsException extends ConflictException {
  constructor() {
    super({
      message: REQUEST_ID_NOT_EXISTS_MESSAGE,
      statusCode: HTTP_RESPONSE_CONFLICT_CODE,
    });
  }
}
