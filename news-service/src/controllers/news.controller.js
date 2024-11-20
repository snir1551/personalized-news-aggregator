import { fetchNewsHandler } from "../services/news.service.js";
import { saveToStateStore, getFromStateStore } from '../services/dapr.service.js';



export const fetchNewsController = async (req, res) => {
    const { userId } = req.body;

    const preferencesResponse = await getFromStateStore(`preferences-${userId}`);

    console.log(`preferencesResponse.data: ${preferencesResponse}`);
   

    const preferences = preferencesResponse;
    console.log(`preferences: ${preferences}`);
    

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }
        const newsResponse = await fetchNewsHandler(preferences.newsCategories);
        await saveToStateStore(`news-${userId}`, newsResponse.data);

        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
};