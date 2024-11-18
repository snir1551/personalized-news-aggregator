import express from 'express';
import newsRoutes from './routes/news.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

connectRabbitMQ()
  .then(() => console.log("News Service connected to RabbitMQ"))
  .catch((err) => console.error("Failed to connect to RabbitMQ:", err));


app.use(express.json());


app.use('/news', newsRoutes); 


app.listen(PORT, () => {
    console.log(`News Service is running on port ${PORT}`);
});