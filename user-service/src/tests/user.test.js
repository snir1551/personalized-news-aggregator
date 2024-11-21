import { describe, it, expect, vi, beforeEach } from 'vitest';
import supertest from 'supertest';
import app from '../index.js'; 
import { User } from '../services/user.service.js';
import { saveToStateStore, deleteFromStateStore } from '../services/dapr.service.js';
