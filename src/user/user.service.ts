import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepositoy: typeof UserEntity,
  ) {}

  async create(user: UserDTO) {
    const [foundUser, isCreated] = await this.userRepositoy.findOrCreate({
      where: { id: user.id },
      defaults: user,
    });
    if (isCreated === false) {
      throw new ConflictException('Requested ID Already Exists Exception');
    }
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user: UserEntity = await this.userRepositoy.findByPk(id);

    if (!user) {
      return null;
    }
    return user;
  }

  async update(user: UserDTO) {
    this.userRepositoy.update({ ...user }, { where: { id: user.id } });
  }

  async delete(id: string) {
    const isDeleted = await this.userRepositoy.destroy({ where: { id } });
    if (!isDeleted) throw new ConflictException('User Not Exist Exception');
  }
}
