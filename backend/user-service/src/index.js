import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import cors from "cors";
dotenv.config();

const app = express();


app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

connectDB();


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('User Service API is running');
});

export default app;