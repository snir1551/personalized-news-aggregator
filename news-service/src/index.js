import express from 'express';
import newsRoutes from './routes/news.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();




app.use(express.json());


app.use('/news', newsRoutes); 

export default app;

