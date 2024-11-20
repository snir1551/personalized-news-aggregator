import { fetchNewsHandler } from "../services/news.service.js";
import { preferencesCache } from '../services/rabbitmq.service.js'
import axios from "axios"
const DAPR_PORT = 3500
const STATE_STORE_NAME = "statestore"
const STATE_URL = `http://dapr:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`

export const fetchNewsController = async (req, res) => {
    const { userId } = req.body;
    //const preferences = preferencesCache.get(userId);
    const URL = `${STATE_URL}/preferences-${userId}`;
    console.log(`URL: ${URL}`);
    const preferencesResponse = await axios.get(URL);
    console.log(`preferencesResponse.data: ${preferencesResponse.data}`);
    //console.log("preferencesResponse.data: ", preferencesResponse.data)

    const preferences = preferencesResponse.data;
    console.log(`preferences: ${preferences}`);
    

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