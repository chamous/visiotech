import { Router } from 'express';
import CaseStudy from '../models/CaseStudy';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';
import Solution from '../models/Solution';

const router = Router();

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const caseStudies = await CaseStudy.findAll({ include: [Solution] });
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error); // Added logging
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single case study
// @route   GET /api/case-studies/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByPk(req.params.id as string, { include: [Solution] });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching single case study:', error); // Added logging
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new case study
// @route   POST /api/case-studies
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const caseStudy = await CaseStudy.create(req.body);
    res.status(201).json(caseStudy);
  } catch (error: any) { // Catch as any to access error.message and other properties
    console.error('Error creating case study:', error); // Detailed logging
    res.status(500).json({ message: 'Server Error', details: error.message || error });
  }
});

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
router.put('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const { id } = req.params; // Destructuring for cleaner code

    const [updated] = await CaseStudy.update(req.body, {
      where: { id: id as string },
    });
    if (updated) {
      const updatedCaseStudy = await CaseStudy.findByPk(id as string, { include: [Solution] });
      return res.json(updatedCaseStudy);
    }
    return res.status(404).json({ message: 'Solution not found' }); // Changed to return res.status(404)
  } catch (error) {
    console.error('Error updating case study:', error); // Added logging
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const deleted = await CaseStudy.destroy({
      where: { id: req.params.id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Case study deleted' });
    }
    throw new Error('Case study not found');
  } catch (error) {
    console.error('Error deleting case study:', error); // Added logging
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;