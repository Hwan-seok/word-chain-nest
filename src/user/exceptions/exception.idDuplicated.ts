import { ConflictException } from '@nestjs/common';
import {
  HTTP_RESPONSE_CONFLICT_CODE,
  REQUEST_ID_DUPLICATED_MESSAGE,
} from '../user.constants';

export class idDuplicatedException extends ConflictException {
  constructor(duplicatedId: string) {
    super({
      message: REQUEST_ID_DUPLICATED_MESSAGE,
      statusCode: HTTP_RESPONSE_CONFLICT_CODE,
    });
  }
}
