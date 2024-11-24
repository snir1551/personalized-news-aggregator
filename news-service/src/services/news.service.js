import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;


export const fetchNewsHandler = async (preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');
    logger.info(`Fetching news for preferences: ${qPreferences}`);
    try {
        const newsResponse = await axios.get('https://newsdata.io/api/1/latest', {
            params: {
                apikey: NEWS_API_KEY,
                q: qPreferences,
            },
        });
        logger.info(`Fetched news successfully, total results: ${newsResponse.data.results.length}`);
        return newsResponse;
    } catch (error) {
        logger.error({ err: error }, 'Error fetching news from the API');
        throw error;
    }
};