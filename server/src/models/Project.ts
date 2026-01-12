import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'projects',
  timestamps: true,
})
export default class Project extends Model {
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
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ENUM('Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'),
    defaultValue: 'Pending',
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  progress!: number; // Percentage 0-100

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  clientId!: string;

  @BelongsTo(() => User)
  client!: User;
}
