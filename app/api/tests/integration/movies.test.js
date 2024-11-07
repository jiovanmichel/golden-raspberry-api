import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import startEnvironment, { app } from '../setup/Environment.js';

import sqliteDB from '../../setup/database/sqlite.js';

describe('Movies API - Testes de Integração', () => {
    beforeAll(async () => {
        await startEnvironment();
    });

    afterAll(async () => {
        sqliteDB.close();
    });

    it('Deve obter todos os filmes', async () => {
        const response = await request(app).get('/api/movies');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve adicionar um novo filme', async () => {
        const newMovie = {
            title: 'Eu sou a Lenda 2',
            year: 2024,
            studios: 'Estúdio de Hollywood',
            producers: 'Will Smith',
            winner: true,
        };

        const response = await request(app).post('/api/movies').send(newMovie);
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newMovie.title);
    });

    it('Deve atualizar um filme parcialmente com PATCH', async () => {
        const response = await request(app).patch('/api/movies/1').send({ title: 'Eu sou a lenda' });
        
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Eu sou a lenda');
    });
});
