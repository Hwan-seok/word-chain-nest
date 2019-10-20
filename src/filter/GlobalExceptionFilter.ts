import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
// import { AppLoggerService } from '../modules/shared/services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // const status = exception.getStatus();

    // this.logger.error(exception);
    console.log(request.body, new Date().toISOString());
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof Error ? exception.message : exception.message.error;

    status = exception.status;

    response.status(status).json({
      status,
      success: false,
      error: message,
    });
  }
}
