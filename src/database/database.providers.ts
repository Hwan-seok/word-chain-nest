import { Sequelize } from 'sequelize-typescript';
import { WordEntity } from '../word/word.entity';
import { ConfigService } from '../config/config.service';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';
import { Message } from '../chat/chat.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: Number(configService.get('MYSQL_PORT')),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
      });
      sequelize.drop;
      sequelize.addModels([WordEntity, UserEntity, RoomEntity, Message]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
