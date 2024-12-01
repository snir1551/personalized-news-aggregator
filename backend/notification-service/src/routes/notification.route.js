import express from 'express';
import { sendNotificationsController } from '../controllers/notification.controller.js';

const router = express.Router();


router.post('/send', sendNotificationsController);

export default router;