import express from 'express';
import notificationRoutes from './routes/notification.route.js';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["POST"],
    credentials: true, 
}));

app.use('/api/notifications', notificationRoutes);


export default app;
