import { UserDTO } from '../../user/dto/user.dto';
import { Message } from '../../chat/interfaces/chat.message';
import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class RoomDTO {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsBoolean()
  isPrivate: boolean;

  @IsNumber()
  maxUsers: number;

  isStarted?: boolean;

  roomNum?: number;

  users?: UserDTO[];

  messages?: Message[];
}
