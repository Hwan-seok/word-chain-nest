import { IsString, IsNumber } from 'class-validator';
export class CreateCatDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;
}
