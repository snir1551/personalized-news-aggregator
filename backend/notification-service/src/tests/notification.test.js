import { describe, it, vi, expect, beforeAll, afterAll } from 'vitest';
import { getFromStateStore, saveToStateStore } from '../services/dapr.service.js';
import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

vi.mock('../services/dapr.service.js', () => ({
    getFromStateStore: vi.fn().mockImplementation(async (key) => {
        if (key === 'news-test-user-id') {
            return {
                results: [
                    { title: 'Tech News 1', link: 'https://google.com', pubDate: '2024-01-01', image_url: '' },
                    { title: 'Tech News 2', link: 'https://google.com', pubDate: '2024-01-02', image_url: '' },
                ],
            };
        }
        if (key === 'userdata-test-user-id') {
            return {
                email: 'morangolan619123@gmail.com',
                telegram: '6127008713',
            };
        }
        throw new Error(`Key ${key} not found`);
    }),
    saveToStateStore: vi.fn().mockResolvedValue(true),
}));

describe('Notification Routes Integration Tests', () => {
    const userId = 'test-user-id';

    beforeAll(async () => {
        await saveToStateStore(`news-${userId}`, {
            articles: [
                { title: 'Tech News 1', content: 'Content 1' },
                { title: 'Tech News 2', content: 'Content 2' },
            ],
        });
        await saveToStateStore(`userdata-${userId}`, {
            email: 'morangolan619123@gmail.com',
            telegram: '6127008713',
        });
    });

    afterAll(async () => {
        vi.clearAllMocks();
    });

    it('should send notifications successfully', async () => {
        const response = await request.post('/api/notifications/send').send({
            userId: 'test-user-id',
        });

        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Notifications sent successfully');
    });

    it('should return error if userId is invalid', async () => {
        const response = await request.post('/api/notifications/send').send({
            userId: 'invalid-user-id',
        });

     
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to send notifications');
    });
});