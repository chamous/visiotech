import { Router } from 'express';
import Product from '../models/Product';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id as string);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const { id } = req.params; // Destructuring for cleaner code

    const [updated] = await Product.update(req.body, {
      where: { id: id as string },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(id as string);
      return res.json(updatedProduct);
    }
    throw new Error('Product not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Product deleted' });
    }
    throw new Error('Product not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
