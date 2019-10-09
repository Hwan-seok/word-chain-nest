import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet()); // To protect app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.enableCors(); // To enable CORS
  //app.use(csurf()); // To protect applications from cross-site request forgery
  app.use(
    //To protect applications from brute-force attacks
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.setGlobalPrefix('api');

  await app.listen(4000);
}
bootstrap();
