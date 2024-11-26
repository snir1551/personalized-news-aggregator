import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.allUsers);
router.post('/login', userController.login);
router.get('/:userId', userController.getUser);
router.post('/register', userController.register);
router.patch('/:userId/preferences', userController.updatePreferences);
router.delete('/:userId', userController.deleteUser);

export default router;