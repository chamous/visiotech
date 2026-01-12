import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/User';
import Project from '../models/Project'; // Import the new Project model
import Solution from '../models/Solution';
import Product from '../models/Product';
import CaseStudy from '../models/CaseStudy';
import DemoRequest from '../models/DemoRequest';
import MediaAsset from '../models/MediaAsset';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'visiotech',
  models: [User, Project, Solution, Product, CaseStudy, DemoRequest, MediaAsset], // Add Project to models
});

export default sequelize;
