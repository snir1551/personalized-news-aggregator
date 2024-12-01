// import dotenv from "dotenv";
// dotenv.config();
import { userService } from '../services/user.service.js';
import { logger } from '../utils/logger.js';


const allUsers = async (req, res) => {
  try {
    logger.info('Fetching all users');
    const user = await userService.getAllUsers();
    logger.info(`Found ${user.length} users`);
    res.json(user);
  } catch (error) {
    logger.error({ err: error }, 'Error retrieving users');
    res.status(500).send('Error retrieving data from the database');
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    logger.info(`Fetching user with ID: ${userId}`);
    const user = await userService.getUserById(userId);

    if (!user) {
      logger.warn(`User with ID: ${userId} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User found: ${user.username}`);
    res.json(user); 
  } catch (error) {
    logger.error({ err: error }, `Error user with ID: ${userId}`);
    res.status(500).send('Error retrieving user from the database');
  }
};

const register = async (req, res) => {
  try {
    logger.info('Registering new user');
    const user = await userService.createUser(req.body);
    logger.info({ userId: user._id }, 'User registered successfully');
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    logger.error({ err: error }, 'Error during user registration');
    res.status(400).json({ error: error.message });
  }
};

  


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Attempting login for email: ${email}`);
    const isValid = await userService.validateLogin(email, password);

    if (!isValid) {
      logger.warn({ email }, 'Invalid login attempt');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = await userService.getUserByEmail(email);
    logger.info({ user }, 'Login successful');
    res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    logger.error({ err: error }, 'Error during login');
    res.status(500).json({ error: error.message });
  }
};
  

const updatePreferences = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedPreferences = req.body.preferences;

      logger.info({ userId, updatedPreferences }, 'Updating preferences');
      const user = await userService.updateUserPreferences(userId, updatedPreferences);

      if (!user) {
        logger.warn({ userId }, 'User not found for preferences update');
        return res.status(404).json({ message: 'User not found' });
      }

      logger.info({ userId }, 'Preferences updated successfully');
      
      res.json({success: true, message: 'Preferences updated successfully', user });
    } catch (error) {
      logger.error({ userId: req.params.userId, err: error }, 'Error updating preferences');
      res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
  try {
      const { userId } = req.params;
      logger.info({ userId }, 'Attempting to delete user and related data');
      const user = await userService.deleteUser(userId);
      
      if (!user) {
        logger.warn({ userId }, 'User not found for deletion');
        return res.status(404).json({ message: 'User not found' });
      }

      logger.info({ userId }, 'User and related data deleted successfully');
      res.status(200).json({ success: true, message: 'User and related data deleted successfully' });
  } catch (error) {
      logger.error({ userId: req.params.userId, err: error }, 'Error during user deletion');
      res.status(500).json({ error: error.message });
  }
};


export const userController = {
  allUsers,
  getUser,
  register,
  login,
  updatePreferences,
  deleteUser
}
