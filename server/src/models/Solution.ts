import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import CaseStudy from './CaseStudy';
import MediaAsset from './MediaAsset';

@Table({
  tableName: 'solutions',
  timestamps: true,
})
export default class Solution extends Model {
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
    allowNull: true, // Image URL can be null initially
  })
  imageUrl?: string;

  @HasMany(() => CaseStudy)
  caseStudies!: CaseStudy[];

  @HasMany(() => MediaAsset)
  media!: MediaAsset[];
}