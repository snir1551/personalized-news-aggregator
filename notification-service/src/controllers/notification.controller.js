import { sendEmailHandler } from '../services/email.service.js';
import { sendTelegramHandler } from '../services/telegram.service.js';
import { getFromStateStore } from '../services/dapr.service.js';
import { extractNews, formatEmailContent } from '../utils/extract.util.js';




export const sendNotifications = async (userPreferences) => {
   
    console.log("userPreferencesNotification: ", userPreferences)
    const { userId } = userPreferences;
   
    const newsResponse = await getFromStateStore(`news-${userId}`);
    const emailResponse = await getFromStateStore(`email-${userId}`);
    // console.log("preferencesResponse.data notification: ", preferencesResponse);
    const extractedNews = extractNews(newsResponse)
    const emailContent = formatEmailContent(extractedNews);

    await Promise.all([
        sendEmailHandler(emailResponse, emailContent),
        //sendTelegramHandler(userPreferences.chat_id, preferencesResponse.data)
    ]);
};

