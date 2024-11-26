import express from 'express';
import { sendNotificationsController } from '../controllers/notification.controller.js';

const router = express.Router();

// הגדרת ה־route
router.post('/send', sendNotificationsController);

export default router;