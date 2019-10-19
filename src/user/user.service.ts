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

  async joinRoom(userId: string, roomNum: number) {
    this.userRepositoy.update(
      { participated: roomNum },
      { where: { id: userId } },
    );
  }

  async leaveRoom(userId: string, roomNum: number) {
    this.userRepositoy.update(
      { participated: null },
      { where: { id: userId } },
    );
  }

  async create(user: UserDTO) {
    const [foundUser, isCreated] = await this.userRepositoy.findOrCreate({
      where: { id: user.id },
      defaults: user,
    });
    if (isCreated === false) {
      throw new ConflictException('Requested ID Already Exists Exception');
    }
  }

  async findUserById(
    id: string,
    withoutPassword = true,
  ): Promise<UserEntity | null> {
    let scope = '';
    if (withoutPassword) {
      scope = 'withoutPassword';
    }
    const user: UserEntity = await this.userRepositoy.scope(scope).findByPk(id);
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
