import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Word extends Model<Word> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  word: string;

  @Column
  part: string;
}
