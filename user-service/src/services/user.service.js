import dotenv from "dotenv";
dotenv.config();
import { User } from '../models/user.model.js';
import { saveToStateStore, deleteFromStateStore } from './dapr.service.js';
import { logger } from '../utils/logger.js';

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        logger.error(`Error in getAllUsers: ${error.message}`);
        throw new Error("Failed to get all users");
    }
};
  
const getUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        logger.error(`Error in getUserById for userId ${userId}: ${error.message}`);
        throw new Error(`Failed to get user with ID: ${userId}`);
    }
};

const createUser = async (userBody) => {
    try {
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
        } else{
            console.log("dapr not saved")
        }
  
        return user;
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw new Error("Failed to create user");
    }
};

const validateLogin = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.isValidPassword(password))) {
            return false;
        }
        return true;
    } catch (error) {
        logger.error(`Error validating login for username ${username}: ${error.message}`);
        throw new Error("Login validation failed");
    }
};

const updateUserPreferences = async (userId, preferences) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
    
        if (process.env.NODE_ENV === 'dev') {
            console.log("dapr saved")
            await saveToStateStore(`preferences-${userId}`, preferences);
        } else {
            console.log("dapr not saved")
        }
  
        return user;
    } catch (error) {
        logger.error(`Error updating preferences for userId ${userId}: ${error.message}`);
        throw new Error("Failed to update preferences");
    }
};

const deleteUser = async (userId) => {
    try {
        if (process.env.NODE_ENV === 'dev') {
            console.log("dapr saved")
            await deleteFromStateStore(`preferences-${userId}`);
            await deleteFromStateStore(`email-${userId}`);
        } else {
            console.log("dapr not saved")
        }
  
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        logger.error(`Error deleting user with userId ${userId}: ${error.message}`);
        throw new Error("Failed to delete user");
    }
};

export const userService = {
    getAllUsers,
    getUserById,
    createUser,
    validateLogin,
    updateUserPreferences,
    deleteUser,
};