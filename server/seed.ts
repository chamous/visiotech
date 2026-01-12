import sequelize from './src/config/database';
import User, { UserRole } from './src/models/User';
import Solution from './src/models/Solution';
import Product from './src/models/Product';
import CaseStudy from './src/models/CaseStudy';
import DemoRequest from './src/models/DemoRequest';
import MediaAsset from './src/models/MediaAsset';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Clear and re-create tables

    // Hash admin password
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@visiotech.com',
      password: adminPassword,
      role: UserRole.ADMIN,
    });

    // Create Client User
    const clientPassword = await bcrypt.hash('client123', salt);
    const clientUser = await User.create({
      name: 'Client User',
      email: 'client@visiotech.com',
      password: clientPassword,
      role: UserRole.CLIENT,
    });

    // Create Solutions
    const solution1 = await Solution.create({
      title: 'Industrial Visual Inspection',
      description: 'Our AI-powered visual inspection systems provide unparalleled accuracy in detecting defects, anomalies, and deviations in manufacturing processes.',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Example image URL
    });
    const solution2 = await Solution.create({
      title: 'AI Defect Detection',
      description: 'Harness the power of deep learning for superior defect identification. Our AI models are trained on vast datasets to recognize even the most subtle imperfections.',
      imageUrl: 'https://images.unsplash.com/photo-1593642632777-277ac02e1de5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Example image URL
    });

    // Create Products
    const product1 = await Product.create({
      name: 'Vision Inspect Pro',
      description: 'An advanced AI inspection system for high-speed manufacturing lines.',
      imageUrl1: 'https://images.unsplash.com/photo-1581091226065-225ad7575217?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // First image URL
      imageUrl2: 'https://images.unsplash.com/photo-1531844973345-5645532454a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Second image URL
    });
    const product2 = await Product.create({
      name: 'RoboGuide AI',
      description: 'Intelligent vision-guided robotics solution that enhances the precision and autonomy of industrial robots.',
      imageUrl1: 'https://images.unsplash.com/photo-1581091870631-f925b4b1a4a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // First image URL
      imageUrl2: 'https://images.unsplash.com/photo-1520607162513-774438312759?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Second image URL
    });

    // Create Media Assets
    const media1 = await MediaAsset.create({
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
      altText: 'Industrial Visual Inspection',
      solutionId: solution1.id,
    });
    const media2 = await MediaAsset.create({
      url: 'https://images.unsplash.com/photo-1581091226065-225ad7575217',
      altText: 'AI Defect Detection',
      solutionId: solution2.id,
    });
    const media3 = await MediaAsset.create({
      url: 'https://images.unsplash.com/photo-1593642632777-277ac02e1de5',
      altText: 'Vision Inspect Pro',
      productId: product1.id,
    });

    // Create Case Studies
    await CaseStudy.create({
      title: 'Automotive Factory Inspection',
      description: 'Implemented an AI vision system for a leading automotive manufacturer.',
      beforeImage: 'https://images.unsplash.com/photo-1550608552-0c9f13c6b2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      afterImage: 'https://images.unsplash.com/photo-1521737711867-e6f7762692e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      metrics: { 'Defect Reduction': 45, 'Inspection Speed': 120 }, // Changed to numbers
      solutionId: solution1.id,
    });

    // Create Demo Requests
    await DemoRequest.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Example Corp',
      message: 'I would like to request a demo of your industrial visual inspection system.',
      userId: clientUser.id,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();