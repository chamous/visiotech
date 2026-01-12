import { Router } from 'express';
import Solution from '../models/Solution';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = Router();

// @desc    Get all solutions
// @route   GET /api/solutions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const solutions = await Solution.findAll();
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single solution
// @route   GET /api/solutions/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const solution = await Solution.findByPk(req.params.id as string);
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    res.json(solution);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new solution
// @route   POST /api/solutions
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const solution = await Solution.create(req.body);
    res.status(201).json(solution);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update solution
// @route   PUT /api/solutions/:id
// @access  Private/Admin
router.put('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const { id } = req.params; // Destructuring for cleaner code
    
    const [updated] = await Solution.update(req.body, {
      where: { id: id as string },
    });

    if (updated) {
      // Add 'as string' here to satisfy findByPk
      const updatedSolution = await Solution.findByPk(id as string); 
      return res.json(updatedSolution);
    }
    
    return res.status(404).json({ message: 'Solution not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete solution
// @route   DELETE /api/solutions/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const deleted = await Solution.destroy({
      where: { id: req.params.id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Solution deleted' });
    }
    throw new Error('Solution not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
