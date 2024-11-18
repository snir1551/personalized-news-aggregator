import express from 'express';
import { fetchNewsController } from '../controllers/news.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(400).json({ error: 'User has no preferences set' });
});

router.get('/:preferences', fetchNewsController);

export default router;