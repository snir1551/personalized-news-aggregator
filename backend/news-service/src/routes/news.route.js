import express from 'express';
import { fetchNewsController } from '../controllers/news.controller.js';

const router = express.Router();



router.get('/:userId', fetchNewsController);

export default router;