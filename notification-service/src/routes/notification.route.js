import express from 'express';
import { sendNotifications } from '../controllers/notification.controller.js';

const router = express.Router();


router.post('/send', async (req, res) => {
    try {
        const userPreferences = req.body;
        await sendNotifications(userPreferences);
        res.status(200).json({ message: 'Notifications sent successfully' });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ error: 'Failed to send notifications' });
    }
});

export default router;