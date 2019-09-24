import { UserDTO } from '../../user/dto/user.dto';
import { Message } from '../../chat/interfaces/chat.message';
import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class RoomDTO {
  @IsString()
  name: String;
  @IsString()
  description?: String;
  @IsBoolean()
  isPrivate: Boolean;
  @IsNumber()
  maxUsers: number;
  users?: UserDTO[];
  messages?: Message[];
  createdAt: Date;
  updatedAt: Date;
}
