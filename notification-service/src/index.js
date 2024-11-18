import express from 'express';
import notificationRoutes from './routes/notification.route.js';

const app = express();
app.use(express.json());


app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Notification service is running on port ${PORT}`);
});