import { User } from '../services/user.service.js';
import { sendToQueue } from '../services/rabbitmq.service.js'

import axios from "axios"
const DAPR_PORT = 3500
const STATE_STORE_NAME = "statestore"
const STATE_URL = `http://dapr:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`
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
      const event = {
        userId,  
        preferences: updatedPreferences,
      };
      // await sendToQueue(event);
      const state = [{key: `preferences-${userId}`, value: updatePreferences}];
      await axios.post(STATE_URL, state);
      res.json({ message: 'Preferences updated successfully', user });
    } catch (error) {
      console.error("error api/users/userId/preferences", error.message, error.stack);
      res.status(500).json({ error: error.message });
    }
};


export const userController = {
  allUsers,
  register,
  login,
  updatePreferences
}
