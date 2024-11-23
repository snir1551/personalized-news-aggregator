import { fetchNewsHandler } from "../services/news.service.js";
import { saveToStateStore, getFromStateStore } from '../services/dapr.service.js';



export const fetchNewsController = async (req, res) => {
    const { userId, preferences } = req.body;
    let preferencesResponse = preferences
    if (process.env.NODE_ENV === 'dev') {
        console.log("saved to dapr")
        preferencesResponse = await getFromStateStore(`preferences-${userId}`);
    } else {
        console.log("not saved to dapr")
    }
    console.log(`preferencesResponse.data: ${preferencesResponse}`);
   

    

    try {
        if (!preferencesResponse) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }
        const newsResponse = await fetchNewsHandler(preferencesResponse.newsCategories);
        if (process.env.NODE_ENV === 'dev') {
            await saveToStateStore(`news-${userId}`, newsResponse.data);
        }

        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
};