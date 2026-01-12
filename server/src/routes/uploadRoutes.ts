import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists relative to the project root
    // For production, consider absolute paths or cloud storage
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter for image files
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Custom error handling for multer
const uploadMiddleware = (req: any, res: any, next: any) => {
  upload.single('image')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: err.message });
    }
    // Everything went fine.
    next();
  });
};


// @desc    Upload single image file
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), uploadMiddleware, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  // Respond with the URL to the uploaded file
  // Assuming the server is serving static files from /public/uploads
  res.status(200).json({
    message: 'Image uploaded successfully!',
    filePath: `/uploads/${req.file.filename}`, // Adjust based on your static file serving
  });
});

export default router;