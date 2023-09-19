import  {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({tableName: 'Books'})
export class Book extends  Model<Book>{

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  author: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  publicationYear: number;
}