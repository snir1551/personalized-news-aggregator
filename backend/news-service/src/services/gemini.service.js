import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

export const summarizeWithGemini = async (prompt) => {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                prompt: {
                    text: prompt,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`Gemini API Error: ${error.response?.data?.error?.message || error.message}`);
    }
};