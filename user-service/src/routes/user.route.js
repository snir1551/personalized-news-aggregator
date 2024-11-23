import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.allUsers);
router.get('/:userId', userController.getUser);
router.get('/login', userController.login);
router.post('/register', userController.register);
router.patch('/:userId/preferences', userController.updatePreferences);
router.delete('/:userId', userController.deleteUser);

export default router;