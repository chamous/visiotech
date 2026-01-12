import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import solutionRoutes from './routes/solutionRoutes';
import productRoutes from './routes/productRoutes';
import caseStudyRoutes from './routes/caseStudyRoutes';
import demoRequestRoutes from './routes/demoRequestRoutes';
import mediaAssetRoutes from './routes/mediaAssetRoutes';
import uploadRoutes from './routes/uploadRoutes'; // Import upload routes
import projectRoutes from './routes/projectRoutes'; // Import project routes
import path from 'path'; // Import path module

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resources
})); 
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


app.use(morgan('dev'));
app.use(express.json());

// Serve static files from the 'public/uploads' directory
const staticUploadsPath = path.join(__dirname, '../public/uploads');
console.log('Serving static files from:', staticUploadsPath);
app.use('/uploads', express.static(staticUploadsPath));


// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // In development, you might want to use sync to create tables
    if (process.env.NODE_ENV === 'development') {
      sequelize.sync({ force: true }).then(() => {
        console.log('Database & tables created!');
      });
    }
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/demo-requests', demoRequestRoutes);
app.use('/api/media-assets', mediaAssetRoutes);
app.use('/api/upload', uploadRoutes); // Use upload routes
app.use('/api/projects', projectRoutes); // Use project routes


app.get('/', (req, res) => {
  res.send('Hello, VisioTech!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
