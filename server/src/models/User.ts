import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import DemoRequest from './DemoRequest';
import Project from './Project'; // Import the new Project model

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CLIENT,
    allowNull: false,
  })
  role!: UserRole;

  @HasMany(() => DemoRequest)
  demoRequests!: DemoRequest[];

  @HasMany(() => Project)
  projects!: Project[]; // Add the association to Project
}