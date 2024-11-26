import { sendEmailService } from './email.service.js';
import { sendTelegramService } from './telegram.service.js';
import { getFromStateStore } from './dapr.service.js';
import { extractNews, formatEmailContent } from '../utils/extract.util.js';
import { logger } from '../utils/logger.js';

export const sendNotificationsService = async (userPreferences) => {
    const { userId } = userPreferences;

    if (!userId) {
        logger.error('Missing userId in userPreferences');
        throw new Error('Missing userId');
    }

    logger.info('Start sendNotifications', { userId });

    try {
        const newsResponse = await getFromStateStore(`news-${userId}`);
        const userDataResponse = await getFromStateStore(`userdata-${userId}`);

        const extractedNews = extractNews(newsResponse);
        logger.info(`Extracted ${extractedNews.length} news`);

        const emailContent = formatEmailContent(extractedNews);

        await Promise.all([
            sendEmailService(userDataResponse.email, emailContent),
            sendTelegramService(userDataResponse.telegram, "You have new updates!"),
        ]);

        logger.info(`Notifications sent successfully for userId: ${userId}`);
    } catch (error) {
        logger.error(`Failed to send notifications for userId: ${userId}`, error);
        throw error;
    }
};