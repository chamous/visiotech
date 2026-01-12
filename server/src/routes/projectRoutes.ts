import { Router } from 'express';
import Project from '../models/Project';
import User from '../models/User';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = Router();

// @desc    Get all projects (Admin only) or projects for a specific client
// @route   GET /api/projects
// @access  Private/Admin or Private/Client
router.get('/', protect, async (req, res) => {
  try {
    let projects;
    if (req.user?.role === UserRole.ADMIN) {
      projects = await Project.findAll({ include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email'] }] });
    } else if (req.user?.role === UserRole.CLIENT) {
      projects = await Project.findAll({ where: { clientId: req.user.id }, include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email'] }] });
    } else {
      return res.status(403).json({ message: 'Not authorized to access projects.' });
    }
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private/Admin or Private/Client (if owns project)
router.get('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id as string, { include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email'] }] });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Authorize: Admin can see any project, Client can only see their own projects
    if (req.user?.role === UserRole.CLIENT && project.clientId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this project.' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching single project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new project (Admin only)
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { title, description, status, progress, clientId, startDate, endDate } = req.body;

  if (!title || !description || !clientId) {
    return res.status(400).json({ message: 'Please provide title, description, and client ID.' });
  }

  try {
    const project = await Project.create({
      title,
      description,
      status,
      progress,
      clientId,
      startDate,
      endDate,
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update project (Admin only)
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { title, description, status, progress, clientId, startDate, endDate } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id as string);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;
    project.progress = progress !== undefined ? progress : project.progress;
    project.clientId = clientId || project.clientId;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete project (Admin only)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Project.destroy({
      where: { id: id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'Project deleted' });
    }
    return res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
