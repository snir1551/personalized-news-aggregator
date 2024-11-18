import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const DAPR_HOST = 'http://localhost';
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT;
const DAPR_APP_ID = 'news-service';

export const fetchNewsHandler = async (preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');
    console.log('NEWS_API_KEY:', NEWS_API_KEY);
    try {
        const newsResponse = await axios.get('https://newsdata.io/api/1/latest', {
            params: {
                apikey: NEWS_API_KEY,
                q: qPreferences,
            },
        });
        return newsResponse;
    } catch (error) {
        throw error;
    }
};