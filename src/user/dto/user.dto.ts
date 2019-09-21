import { IsString, IsEmail } from 'class-validator';

export class UserDTO {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  userName: string;
}
