import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js'; 

dotenv.config();


const app = express();


app.use(express.json());


connectDB();


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('User Service API is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});