
import axios from 'axios';

export const sendTelegramHandler = async (chat_id, text) => {
    const TELEGRAM_API = `https://api.telegram.org/bot${process.env.MY_TOKEN}`;
    await axios.post(`${TELEGRAM_API}/sendMessage`, { chat_id, text });
};