import axios from 'axios';

const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const DAPR_URL = `http://localhost:${DAPR_HTTP_PORT}/v1.0/invoke/news-service/method/news`;

export const fetchNewsContent = async (userPreferences) => {
    const preferencesArray = userPreferences.preferences.split(',');
    const daprResponse = await axios.post(`${DAPR_URL}/${userPreferences}`, { preferences: preferencesArray });
    return daprResponse.data;
};