import { Router } from 'express';
import MediaAsset from '../models/MediaAsset';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = Router();

// @desc    Get all media assets
// @route   GET /api/media-assets
// @access  Public
router.get('/', async (req, res) => {
  try {
    const mediaAssets = await MediaAsset.findAll();
    res.json(mediaAssets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single media asset
// @route   GET /api/media-assets/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const mediaAsset = await MediaAsset.findByPk(req.params.id as string);
    if (!mediaAsset) {
      return res.status(404).json({ message: 'Media asset not found' });
    }
    res.json(mediaAsset);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Upload new media asset (placeholder)
// @route   POST /api/media-assets
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    // In a real application, you would handle file uploads here
    // e.g., using multer and then uploading to S3 or a local file system
    const { url, altText, solutionId, productId } = req.body;
    if (!url || !altText) {
      return res.status(400).json({ message: 'Please provide URL and altText' });
    }

    const mediaAsset = await MediaAsset.create({ url, altText, solutionId, productId });
    res.status(201).json(mediaAsset);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update media asset
// @route   PUT /api/media-assets/:id
// @access  Private/Admin
router.put('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const { id } = req.params; // Destructuring for cleaner code

    const [updated] = await MediaAsset.update(req.body, {
      where: { id: id as string },
    });
    if (updated) {
      const updatedMediaAsset = await MediaAsset.findByPk(id as string);
      return res.json(updatedMediaAsset);
    }
    throw new Error('Media asset not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete media asset
// @route   DELETE /api/media-assets/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const deleted = await MediaAsset.destroy({
      where: { id: req.params.id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Media asset deleted' });
    }
    throw new Error('Media asset not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
