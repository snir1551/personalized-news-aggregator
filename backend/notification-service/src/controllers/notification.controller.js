import { sendEmailHandler } from '../services/email.service.js';
import { sendTelegramHandler } from '../services/telegram.service.js';
import { getFromStateStore } from '../services/dapr.service.js';
import { extractNews, formatEmailContent } from '../utils/extract.util.js';
import { logger } from '../utils/logger.js';



export const sendNotifications = async (userPreferences) => {
    logger.info('Start sendNotifications with userPreferences', userPreferences);
    const { userId } = userPreferences;
    if (!userId){
        logger.error('Missing userId in userPreferences');
        throw new Error("Missing userId");
    } 

    try {
        const newsResponse = await getFromStateStore(`news-${userId}`);
        logger.info(`Fetched news for userId: ${userId}`);

        const userDataResponse = await getFromStateStore(`userdata-${userId}`);
        logger.info(`Fetched user data for userId: ${userId}`);

        const extractedNews = extractNews(newsResponse);
        logger.info(`Extracted ${extractedNews.length} news articles`);

        const emailContent = formatEmailContent(extractedNews);
        logger.info('Formatted email content for user');

        await Promise.all([
            sendEmailHandler(userDataResponse.email, emailContent),
            sendTelegramHandler(userDataResponse.telegram, "you got news to email"),
        ]);

        logger.info(`Notifications sent successfully to userId: ${userId}`);
    } catch (error) {
        logger.error({ err: error }, 'Error in sendNotifications');
        throw error;
    }
};