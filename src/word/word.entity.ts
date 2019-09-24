import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'words', timestamps: false })
export class WordEntity extends Model<WordEntity> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  word: string;

  @Column
  part: string;
}
