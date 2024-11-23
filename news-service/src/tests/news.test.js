import { describe, it, expect } from 'vitest';

import supertest from 'supertest';
import app from '../index.js';




const request = supertest(app);


describe("User crud operation", () => {

    describe("GET /news", () => {
        it("should fetch news based on user preferences", async () => {
            const userPreferences = 
            {
                newsCategories: ["technology","sports","healt3"],
                technology: ["email"]
            }
            const userId = "123"
            const response = await request.get(`/news`).send({preferences: userPreferences});
            expect(response.status).toBe(200);
        });

        it("should return 400 if preferences are not set", async () => {
            const userPreferences = null
            const userId = "123"
            const response = await request.get(`/news`).send({preferences: userPreferences});
            expect(response.status).toBe(400);
        });


        it("should return 500 if fetching news fails", async () => {
            const userPreferences = 
            {
                technology: ["email"]
            }
            const userId = "123"
            const response = await request.get(`/news`).send({preferences: userPreferences});
            expect(response.status).toBe(500);
        });
    });

    
    

});


