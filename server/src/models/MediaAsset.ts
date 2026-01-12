import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Solution from './Solution';
import Product from './Product';

@Table({
  tableName: 'media_assets',
  timestamps: true,
})
export default class MediaAsset extends Model {
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
  url!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  altText!: string;

  @ForeignKey(() => Solution)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  solutionId?: string;

  @BelongsTo(() => Solution)
  solution?: Solution;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productId?: string;

  @BelongsTo(() => Product)
  product?: Product;
}
