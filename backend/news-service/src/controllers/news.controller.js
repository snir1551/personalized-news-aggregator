import { fetchNewsHandler } from "../services/news.service.js";
import { saveToStateStore, getFromStateStore } from '../services/dapr.service.js';
import { logger } from '../utils/logger.js';
// import { summarizeWithGemini } from "../services/gemini.service.js";

export const fetchNewsController = async (req, res) => {
    const { userId } = req.params;
    const { preferences } = req.body;
    let preferencesResponse = preferences;
    
    logger.info(`Received request to fetch news for userId: ${userId}`);
    try {
        if (process.env.NODE_ENV === 'dev') {
            logger.info(`Fetching preferences from state store for userId: ${userId}`);
            preferencesResponse = await getFromStateStore(`preferences-${userId}`);
            logger.info(`Preferences fetched from dapr: ${JSON.stringify(preferencesResponse)}`);
        } else {
            logger.info(`Running in production environment, not fetching from dapr`);
        }
        console.log(`preferencesResponse.data: ${preferencesResponse}`);
   
   
        if (!preferencesResponse) {
            logger.warn(`UserId ${userId} has no preferences set`);
            return res.status(400).json({ error: 'User has no preferences set' });
        }
         
        logger.info(`Fetching news based on categories: ${preferencesResponse.newsCategories}`);
        const newsResponse = await fetchNewsHandler(preferencesResponse.newsCategories);

        // logger.info(`Summarizing news for userId: ${userId}`);
        // const summarizedNews = await generateSummaries(newsResponse.data.results)
        
       

        if (process.env.NODE_ENV === 'dev') {
            logger.info(`Saving news data to dapr for userId: ${userId}`);
            await saveToStateStore(`news-${userId}`, newsResponse.data);
        }
        logger.info(`News successfully fetched for userId: ${userId}, sending response`);
        res.json(newsResponse.data);
    } catch (error) {
        logger.error({ userId, err: error }, 'Error fetching news');
        res.status(500).json({ error: 'Error fetching news' });
    }
};



// async function generateSummaries(news) {
    
//     const summarizedNews = await Promise.all(news.map(async (article) => {
        
//         if (!article || !article.title || !article.content) {
//             console.warn(`Skipping article due to missing title or content: ${JSON.stringify(article)}`);
//             return { ...article, summary: 'No valid content to summarize' };
//         }
        
//         const prompt = `Summarize the following news article in 2 concise sentences:
      
//         Title: ${article.title}
//         Content: ${article.content}`;
        
        
//         try {
//             const result = await summarizeWithGemini(prompt);
            

//             if (result && result.response && result.response.text) {
//                 const summary = result.response.text; 
                
//                 return {
//                     ...article,
//                     summary,
//                 };
//             } else {
//                 console.error(`Unexpected response format from Gemini API: ${JSON.stringify(result)}`);
//                 return { ...article, summary: 'Error generating summary' };
//             }
//         } catch (err) {
//             console.error(`Error summarizing article: ${article.title}, Error: ${JSON.stringify(err, null, 2)}`);
//             return { ...article, summary: 'Error generating summary' };
//         }
//     }));

//     return summarizedNews;
// }