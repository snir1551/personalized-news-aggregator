import { User } from '../services/user.service.js';
import { saveToStateStore, deleteFromStateStore } from '../services/dapr.service.js';

const allUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).send('Error retrieving data from the database');
  }
};

const register = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      await saveToStateStore(`preferences-${user._id}`, req.body.preferences);
      await saveToStateStore(`email-${user._id}`, req.body.email);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

  


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

const updatePreferences = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedPreferences = req.body.preferences;
      const user = await User.findByIdAndUpdate(userId, { preferences: updatedPreferences }, { new: true });
      console.log("user-service, userId: ", userId)
      await saveToStateStore(`preferences-${userId}`, updatedPreferences);
      res.json({ message: 'Preferences updated successfully', user });
    } catch (error) {
      console.error("error api/users/userId/preferences", error.message, error.stack);
      res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
  try {
      const { userId } = req.params;


      await deleteFromStateStore(`preferences-${userId}`);
      await deleteFromStateStore(`email-${userId}`);


      const user = await User.findOneAndDelete({ _id: userId });
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User and related data deleted successfully' });
  } catch (error) {
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
