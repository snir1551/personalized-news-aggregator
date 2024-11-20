import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.allUsers);
router.get('/login', userController.login);
router.post('/register', userController.register);
router.put('/:userId/preferences', userController.updatePreferences);
router.delete('/:userId/deleteUser', userController.deleteUser);

export default router;