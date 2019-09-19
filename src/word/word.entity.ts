import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Word extends Model<Word> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  word: string;

  @Column
  part: string;
}
