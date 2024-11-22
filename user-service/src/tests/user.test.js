import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../index.js'; // Import the app
import { User } from '../services/user.service.js';
//import { saveToStateStore, deleteFromStateStore } from '../dapr.service.js';



const request = supertest(app)


describe("User crud operation", () => {
    beforeAll( async () => {
        await mongoose.connect("mongodb+srv://snir1552:zionet1230@cluster0.dvzjk.mongodb.net/MyNewData?retryWrites=true&w=majority")
    });

    beforeEach(async () => {
        await User.deleteMany({});
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

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
            const response = await request.post("/api/users/register").send(testUser).expect(201)
        })
    })
})