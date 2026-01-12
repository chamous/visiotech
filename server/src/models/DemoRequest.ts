import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'demo_requests',
  timestamps: true,
})
export default class DemoRequest extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userId?: string;

  @BelongsTo(() => User)
  user?: User;
}
