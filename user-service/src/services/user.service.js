import dotenv from "dotenv";
dotenv.config();
import { User } from '../models/user.model.js';
import { saveToStateStore, deleteFromStateStore } from './dapr.service.js';

const getAllUsers = async () => {
    return await User.find();
};
  
const getUserById = async (userId) => {
    return await User.findById(userId);
};

const createUser = async (userBody) => {
    const user = new User(userBody);
    await user.save();
    const userData = {
        email: user.email,
        telegram: user.chatid
    };
    if (process.env.NODE_ENV === 'dev') {
        console.log("dapr saved")
        await saveToStateStore(`preferences-${user._id}`, user.preferences);
        await saveToStateStore(`userdata-${user._id}`, userData);
    }else{
        console.log("dapr not saved")
    }
  
    return user;
};

const validateLogin = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.isValidPassword(password))) {
      return false;
    }
    return true;
};

const updateUserPreferences = async (userId, preferences) => {
    const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
    
    if (process.env.NODE_ENV === 'dev') {
        console.log("dapr saved")
        await saveToStateStore(`preferences-${userId}`, preferences);
    }else{
        console.log("dapr not saved")
    }
  
    return user;
};

const deleteUser = async (userId) => {
    if (process.env.NODE_ENV === 'dev') {
        console.log("dapr saved")
      await deleteFromStateStore(`preferences-${userId}`);
      await deleteFromStateStore(`email-${userId}`);
    }else{
        console.log("dapr not saved")
    }
  
    return await User.findByIdAndDelete(userId);
};

export const userService = {
    getAllUsers,
    getUserById,
    createUser,
    validateLogin,
    updateUserPreferences,
    deleteUser,
};