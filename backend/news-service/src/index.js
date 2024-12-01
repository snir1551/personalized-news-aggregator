import express from 'express';
import newsRoutes from './routes/news.route.js';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();




app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET"],
    credentials: true, 
}));


app.use('/api/news', newsRoutes); 

export default app;

