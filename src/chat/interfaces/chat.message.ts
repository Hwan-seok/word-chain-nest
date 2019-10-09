import { UserDTO } from '../../user/dto/user.dto';

export class Message {
  roomNum: number;

  user: UserDTO;
  
  contents: string;

  date: Date;
}
