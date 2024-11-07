import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import startEnvironment, { app } from '../setup/Environment.js';

import sqliteDB from '../../setup/database/sqlite.js';

describe('Producers API - Testes de Integração', () => {
    beforeAll(async () => {
        await startEnvironment();
    });

    afterAll(async () => {
        sqliteDB.close();
    });

    it('Deve retornar os produtores com maior e menor intervalo de prêmios', async () => {
        const response = await request(app).get('/api/producers/awards-min-max-interval');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');
        expect(response.body.min).toBeInstanceOf(Array);
        expect(response.body.max).toBeInstanceOf(Array);
    });
});
