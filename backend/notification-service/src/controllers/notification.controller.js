
import { sendNotificationsService } from '../services/notification.service.js';
import { logger } from '../utils/logger.js';


export const sendNotificationsController = async (req, res) => {
    
    const userPreferences = req.body;

    try {
        await sendNotificationsService(userPreferences);
        res.status(200).json({ success: true, message: 'Notifications sent successfully' });
    } catch (error) {
        logger.error('Error sending notifications', error);
        res.status(500).json({ error: 'Failed to send notifications' });
    }
};