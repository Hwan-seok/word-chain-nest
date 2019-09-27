import { UserDTO } from '../../user/dto/user.dto';

export class Message {
  user: UserDTO;
  contents: string;
  date: Date;
}
