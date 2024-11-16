import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.allUsers);
router.get('/login', userController.login);
router.post('/register', userController.register);
router.put('/:userId/preferences', userController.updatePreferences);

export default router;