import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import startEnvironment, { app } from '../setup/Environment.js';

import sequelizeConfig from '../../setup/database/sequelizeConfig.js';

import MovieModel from '../../models/Movie.js';
import MovieService from '../../services/Movie.js';

describe('SQL Injection na model Movie', () => {
    beforeAll(async () => {
        await startEnvironment();
    });

    afterAll(async () => {
        await sequelizeConfig.close();
    });

    test('deve evitar injeção de SQL em consultas', async () => {
        const maliciousTitle = "' OR 1=1 --";
    
        const movie = await MovieModel.findOne({
            where: {
                title: maliciousTitle
            }
        });
    
        expect(movie).toBeNull();
    });

    test('deve evitar injeção de SQL no metodo findById', async () => {
        const maliciousFilter = "' OR 1=1 --";

        try {
            const movie = await MovieService.findById(maliciousFilter);
    
            expect(movie).toBeNull();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain('Filme não encontrado');
        }
    });
});
