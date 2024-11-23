import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../index.js'; // Import the app
import { User } from '../models/user.model.js';




const request = supertest(app);


describe("User crud operation", () => {
    beforeAll( async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testUser = {
        username: "moran123",
        email: "morangolan619123@gmail.com",
        password: "shlomit123",
        preferences: {
        newsCategories: ["technology", "sports", "healt3"],
        technology: ["email"]
        },
        chatid: "6127008713"
    }

    describe("create user", () => {
        it("should create new user", async () => {
            const response = await request.post("/api/users/register").send(testUser).expect(201);
            expect(response.body.user).toHaveProperty("_id");
            expect(response.body.user.username).toBe(testUser.username);
        });
    });

    describe("Get user by ID", () => {
        it("should fetch a user by ID", async () => {
            const createdUser = await request.post("/api/users/register").send(testUser).expect(201);
            const userId = createdUser.body.user._id;

            const response = await request.get(`/api/users/${userId}`).expect(200);
            expect(response.body._id).toBe(createdUser.body.user._id);
            expect(response.body.email).toBe(testUser.email);
        });
    });

    describe("Update user", () => {
        it("should update user information", async () => {
            const createdUser = await request.post("/api/users/register").send(testUser).expect(201);
            const userId = createdUser.body.user._id;

            const updatedData = {
                "preferences": {
                    "newsCategories": ["love"],
                    "technology": ["email"]
                }
            };

            const response = await request.patch(`/api/users/${userId}/preferences`).send(updatedData).expect(200);
            expect(response.body.user.preferences.newsCategories).toEqual(updatedData.preferences.newsCategories);
            expect(response.body.user.preferences.technology).toEqual(updatedData.preferences.technology);
        });
    });

    describe("Delete user", () => {
        it("should delete a user by ID", async () => {
            const createdUser = await request.post("/api/users/register").send(testUser).expect(201);
            const userId = createdUser.body.user._id;

            await request.delete(`/api/users/${userId}`).expect(200);

            const response = await request.get(`/api/users/${userId}`).expect(404);
            expect(response.body.message).toBe("User not found");
        });
    });
})