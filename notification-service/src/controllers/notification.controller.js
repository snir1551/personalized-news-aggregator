import { sendEmailHandler } from '../services/email.service.js';
import { sendTelegramHandler } from '../services/telegram.service.js';
import { getFromStateStore } from '../services/dapr.service.js';
import { extractNews, formatEmailContent } from '../utils/extract.util.js';




export const sendNotifications = async (userPreferences) => {
   
    console.log("userPreferencesNotification: ", userPreferences)
    const { userId } = userPreferences;
    const technology = [];
    const newsResponse = await getFromStateStore(`news-${userId}`);
    const userDataResponse = await getFromStateStore(`userdata-${userId}`);
    //console.log("userDataResponse: ", userDataResponse);
    // const preferencesResponse = await getFromStateStore(`preferences-${userId}`);
    //technology = preferencesResponse.technology;
    
    // console.log("preferencesResponse.data notification: ", preferencesResponse);
    const extractedNews = extractNews(newsResponse);
    const emailContent = formatEmailContent(extractedNews);
    
    await Promise.all([
        sendEmailHandler(userDataResponse.email, emailContent),
        sendTelegramHandler(userDataResponse.telegram, "you got news to email")
    ]);
};

