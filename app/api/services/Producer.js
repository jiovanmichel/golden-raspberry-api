import MovieModel from '../models/Movie.js';
import { getMinMaxDetailsIntervalInYears, groupWinYearsByProducers } from './helpers/Producer.js';

const ProducerService = {
    async getMinMaxAwardsInterval() {
        try {
            const movies = await MovieModel.findAll({
                attributes: ['producers', 'year'],
                where: { winner: 'yes' },
                order: [
                    ['producers', 'ASC'],
                    ['year', 'ASC'],
                ],
            });

            const producersYears = groupWinYearsByProducers(movies);

            const results = {
                min: [],
                max: []
            }

            let minInterval = Infinity;
            let maxInterval = -Infinity;

            for (const producer in producersYears) {
                const details = getMinMaxDetailsIntervalInYears(producersYears[producer]);

                const minIntervalProducer = details.min?.interval;
                const maxIntervalProducer = details.max?.interval;

                if (minIntervalProducer < minInterval) {
                    minInterval = minIntervalProducer;
                    results.min = [{ producer, ...details.min }];
                } else if (minIntervalProducer === minInterval) {
                    results.min.push({ producer, ...details.min });
                }

                if (maxIntervalProducer > maxInterval) {
                    maxInterval = maxIntervalProducer;
                    results.max = [{ producer, ...details.max }]; 
                } else if (maxIntervalProducer === maxInterval) {
                    results.max.push({ producer, ...details.max });
                }
            }

            return results;
        } catch (err) {
            throw new Error('Erro ao buscar filmes: ' + err.message);
        }
    }
};

export default ProducerService;
