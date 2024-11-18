import { fetchNewsHandler } from "../services/news.service.js";
import { preferencesCache } from '../services/rabbitmq.service.js'

export const fetchNewsController = async (req, res) => {
    const { userId } = req.body;
    const preferences = preferencesCache.get(userId);
    

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        const newsResponse = await fetchNewsHandler(preferences.newsCategories);
        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
};