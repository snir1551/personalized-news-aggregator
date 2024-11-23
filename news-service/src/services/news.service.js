import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;


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