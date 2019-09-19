import { Sequelize } from 'sequelize-typescript';
import { Word } from '../word/word.entity';
import { ConfigService } from '../config/config.service';
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
      sequelize.addModels([Word]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
