import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import MediaAsset from './MediaAsset';

@Table({
  tableName: 'products',
  timestamps: true,
})
export default class Product extends Model {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl1?: string; // First image URL

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl2?: string; // Second image URL

  @HasMany(() => MediaAsset)
  media!: MediaAsset[];
}
