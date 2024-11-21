import { User } from '../services/user.service.js';
import { saveToStateStore, deleteFromStateStore } from '../services/dapr.service.js';
import { logger } from '../utils/logger.js'

const allUsers = async (req, res) => {
  try {
    logger.info('Fetching all users');
    const user = await User.find();
    logger.info(`Found ${user.length} users`);
    res.json(user);
  } catch (error) {
    logger.error({ err: error }, 'Error retrieving users');
    res.status(500).send('Error retrieving data from the database');
  }
};

const register = async (req, res) => {
    try {
      logger.info('Registering new user');
      const user = new User(req.body);
      await user.save();
      logger.info({ userId: user._id }, 'User registered successfully');
      await saveToStateStore(`preferences-${user._id}`, req.body.preferences);
      const userData = {
        email: req.body.email,
        telegram: req.body.chatid
      };
      await saveToStateStore(`userdata-${user._id}`, userData);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      logger.error({ err: error }, 'Error during user registration');
      res.status(400).json({ error: error.message });
    }
};

  


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    logger.info(`Attempting login for username: ${username}`);

    const user = await User.findOne({ username });
    if (!user || !(await user.isValidPassword(password))) {
      logger.warn({ username }, 'Invalid login attempt');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    logger.info({ username }, 'Login successful');
    res.json({ message: 'Login successful'});
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
      const user = await User.findByIdAndUpdate(userId, { preferences: updatedPreferences }, { new: true });

      console.log("user-service, userId: ", userId)
      await saveToStateStore(`preferences-${userId}`, updatedPreferences);
      logger.info({ userId }, 'Preferences updated successfully');
      
      res.json({ message: 'Preferences updated successfully', user });
    } catch (error) {
      console.error("error api/users/userId/preferences", error.message, error.stack);
      logger.error({ userId: req.params.userId, err: error }, 'Error updating preferences');
      res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
  try {
      const { userId } = req.params;
      logger.info({ userId }, 'Attempting to delete user and related data');

      await deleteFromStateStore(`preferences-${userId}`);
      await deleteFromStateStore(`email-${userId}`);


      const user = await User.findOneAndDelete({ _id: userId });
      
      if (!user) {
        logger.warn({ userId }, 'User not found for deletion');
        return res.status(404).json({ message: 'User not found' });
      }

      logger.info({ userId }, 'User and related data deleted successfully');
      res.status(200).json({ message: 'User and related data deleted successfully' });
  } catch (error) {
      logger.error({ userId: req.params.userId, err: error }, 'Error during user deletion');
      res.status(500).json({ error: error.message });
  }
};


export const userController = {
  allUsers,
  register,
  login,
  updatePreferences,
  deleteUser
}
