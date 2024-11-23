import { sendEmailHandler } from '../services/email.service.js';
import { sendTelegramHandler } from '../services/telegram.service.js';
import { getFromStateStore } from '../services/dapr.service.js';
import { extractNews, formatEmailContent } from '../utils/extract.util.js';




export const sendNotifications = async (userPreferences) => {
    console.log("Start sendNotifications with userPreferences:", userPreferences);
    const { userId } = userPreferences;
    if (!userId) throw new Error("Missing userId");

    try {
        const newsResponse = await getFromStateStore(`news-${userId}`);
        console.log("Fetched news:", newsResponse);

        const userDataResponse = await getFromStateStore(`userdata-${userId}`);
        console.log("Fetched user data:", userDataResponse);

        const extractedNews = extractNews(newsResponse);
        console.log("Extracted news:", extractedNews);

        const emailContent = formatEmailContent(extractedNews);
        console.log("Email content:", emailContent);

        await Promise.all([
            sendEmailHandler(userDataResponse.email, emailContent),
            sendTelegramHandler(userDataResponse.telegram, "you got news to email"),
        ]);

        console.log("Notifications sent successfully.");
    } catch (error) {
        console.error("Error in sendNotifications:", error.message);
        throw error;
    }
};