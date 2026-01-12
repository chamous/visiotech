import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Solution from './Solution';

@Table({
  tableName: 'case_studies',
  timestamps: true,
})
export default class CaseStudy extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  beforeImage!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  afterImage!: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metrics?: any;

  @ForeignKey(() => Solution)
  @Column({
    type: DataType.STRING,
    allowNull: true, // Changed to true
  })
  solutionId?: string; // Changed to optional

  @BelongsTo(() => Solution)
  solution?: Solution; // Changed to optional
}
