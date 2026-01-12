import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Utility function to generate JWT
const generateToken = (id: string, role: UserRole) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

// @desc    Register new user (Public access, defaults to CLIENT role)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; // Role is not taken from req.body for public registration

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Check if user exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with CLIENT role by default
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: UserRole.CLIENT, // Force CLIENT role for public registration
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, no user data' });
    }
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


// --- ADMIN USER MANAGEMENT ENDPOINTS ---

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
router.get('/users', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } }); // Exclude password from response
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single user
// @route   GET /api/auth/users/:id
// @access  Private/Admin
router.get('/users/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id as string, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching single user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new user (by Admin)
// @route   POST /api/auth/users
// @access  Private/Admin
router.post('/users', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Check if user exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // Role can be specified by admin
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error creating user by admin:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update user details
// @route   PUT /api/auth/users/:id
// @access  Private/Admin
router.put('/users/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { name, email, password, role } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id as string);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    // Only update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, authorize(UserRole.ADMIN), async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.destroy({
      where: { id: id as string },
    });
    if (deleted) {
      return res.status(204).json({ message: 'User deleted' });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;