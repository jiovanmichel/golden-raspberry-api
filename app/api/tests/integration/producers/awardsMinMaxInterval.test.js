import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import startEnvironment, { app } from '../../setup/Environment.js';

import sequelizeConfig from '../../../setup/database/sequelizeConfig.js';

let response;

describe('Producers API - Testes de integração dos intervalos mínimo e máximo de prêmios', () => {
    beforeAll(async () => {
        await startEnvironment();

        response = await request(app).get('/api/producers/awards-min-max-interval');
    });

    afterAll(async () => {
        await sequelizeConfig.close();
    });

    it('Deve retornar status 200', async () => {
        expect(response.status).toBe(200);
    });

    it('Deve retornar um objeto com as propriedades "min" e "max"', async () => {
        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');
    });

    it('Deve garantir que "min" e "max" sejam arrays e tenham no mínimo um valor', async () => {
        expect(response.body.min).toBeInstanceOf(Array);
        expect(response.body.min).not.toHaveLength(0);

        expect(response.body.max).toBeInstanceOf(Array);
        expect(response.body.max).not.toHaveLength(0);
    });

    it('Deve validar a estrutura de dados da propriedade "min" dos intervalos', async () => {
        const minIntervals = response.body.min;

        for (const interval of minIntervals) {
            expect(interval).toHaveProperty('producer');
            expect(interval).toHaveProperty('interval');
            expect(interval).toHaveProperty('previousWin');
            expect(interval).toHaveProperty('followingWin');
            expect(typeof interval.producer).toBe('string');
            expect(typeof interval.interval).toBe('number');
            expect(typeof interval.previousWin).toBe('number');
            expect(typeof interval.followingWin).toBe('number');
        }
    });

    it('Deve validar a estrutura de dados da propriedade "max" dos intervalos', async () => {
        const minIntervals = response.body.min;

        for (const interval of minIntervals) {
            expect(interval).toHaveProperty('producer');
            expect(interval).toHaveProperty('interval');
            expect(interval).toHaveProperty('previousWin');
            expect(interval).toHaveProperty('followingWin');
            expect(typeof interval.producer).toBe('string');
            expect(typeof interval.interval).toBe('number');
            expect(typeof interval.previousWin).toBe('number');
            expect(typeof interval.followingWin).toBe('number');
        }
    });
});
