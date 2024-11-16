import { fetchNewsContent } from '../services/dapr.service.js';
import { sendEmailHandler } from '../services/email.service.js';
import { sendTelegramHandler } from '../services/telegram.service.js';

export const sendNotifications = async (userPreferences) => {
    const newsContent = await fetchNewsContent(userPreferences);

    await Promise.all([
        sendEmailHandler(userPreferences.email, newsContent),
        sendTelegramHandler(userPreferences.chat_id, newsContent)
    ]);
};