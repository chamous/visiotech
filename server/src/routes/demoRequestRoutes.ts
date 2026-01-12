import { Router } from 'express';
import DemoRequest from '../models/DemoRequest';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';
import User from '../models/User';

const router = Router();

// @desc    Get all demo requests (Admin only)
// @route   GET /api/demo-requests
// @access  Private/Admin
router.get('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const demoRequests = await DemoRequest.findAll({ include: [User] });
    res.json(demoRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single demo request (Admin only)
// @route   GET /api/demo-requests/:id
// @access  Private/Admin
router.get('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const demoRequest = await DemoRequest.findByPk(req.params.id as string, { include: [User] });
    if (!demoRequest) {
      return res.status(404).json({ message: 'Demo request not found' });
    }
    res.json(demoRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new demo request
// @route   POST /api/demo-requests
// @access  Public (or Private/Client if authenticated)
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    let userId = req.user?.id; // Get user id if authenticated

    const demoRequest = await DemoRequest.create({
      name,
      email,
      company,
      message,
      userId: userId || null, // Associate with user if authenticated
    });
    res.status(201).json(demoRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete demo request (Admin only)
// @route   DELETE /api/demo-requests/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const deleted = await DemoRequest.destroy({
      where: { id: req.params.id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Demo request deleted' });
    }
    throw new Error('Demo request not found');
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
